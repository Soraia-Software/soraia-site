import { useEffect, useMemo, useState } from "react";
import { BANDI, REGIONI, type Bando, type Beneficiario, type Copertura, type Tipo } from "./data";

// Elenco filtrabile dei bandi su /bandi. Lo stato di ogni bando si calcola dalle date
// rispetto a oggi: il primo render usa la data di build (passata come prop, così
// l'HTML del server e quello idratato coincidono), poi passa alla data reale.

type Stato = "aperto" | "in-apertura" | "sempre" | "periodico" | "chiuso";

const MESI = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

const TIPO: Record<Tipo, string> = {
  "fondo-perduto": "Fondo perduto",
  finanziamento: "Finanziamento agevolato",
  misto: "Finanziamento e fondo perduto",
  fiscale: "Agevolazione fiscale",
};

const BENEF: Record<Beneficiario, string> = {
  micro: "Micro",
  piccole: "Piccole",
  medie: "Medie",
  grandi: "Grandi",
  startup: "Startup innovative",
  professionisti: "Professionisti",
  under35: "Under 35",
};

const COPRE: Record<Copertura, string> = {
  software: "Software",
  ia: "Intelligenza artificiale",
  consulenza: "Consulenza",
  formazione: "Formazione",
  cloud: "Cloud",
};

const ORDINE: Record<Stato, number> = { aperto: 0, "in-apertura": 1, sempre: 2, periodico: 3, chiuso: 4 };

function isoOggi() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function data(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MESI[m - 1]} ${y}`;
}

function giorniTra(da: string, a: string) {
  const [y1, m1, d1] = da.split("-").map(Number);
  const [y2, m2, d2] = a.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

function statoDi(b: Bando, oggi: string): Stato {
  if (b.chiusoIl) return "chiuso";
  if (b.scadenza && oggi > b.scadenza) return "chiuso";
  if (b.apertura && oggi < b.apertura) return "in-apertura";
  if (!b.scadenza) return b.periodico ? "periodico" : "sempre";
  return "aperto";
}

function toggle<T>(set: Set<T>, v: T) {
  const next = new Set(set);
  next.has(v) ? next.delete(v) : next.add(v);
  return next;
}

const DOT: Record<Stato, string> = {
  aperto: "var(--color-success)",
  "in-apertura": "var(--color-amber)",
  sempre: "var(--color-violet-500)",
  periodico: "var(--color-violet-500)",
  chiuso: "var(--color-ink-soft)",
};

function etichettaStato(b: Bando, s: Stato) {
  if (s === "aperto") return "Aperto";
  if (s === "in-apertura") return `Apre il ${data(b.apertura!)}`;
  if (s === "sempre") return "Sempre attivo";
  if (s === "periodico") return "Ogni anno";
  return b.chiusoIl ? `Chiuso il ${data(b.chiusoIl)}` : "Chiuso";
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{
        minHeight: 38,
        padding: "7px 14px",
        borderRadius: 999,
        border: `1.5px solid ${on ? "var(--color-brand)" : "var(--color-line-strong)"}`,
        background: on ? "var(--color-brand)" : "#fff",
        color: on ? "#fff" : "var(--color-ink)",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background .15s, border-color .15s, color .15s",
      }}
    >
      {children}
    </button>
  );
}

function Gruppo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label}>
      <p className="text-[13px] font-semibold mb-2" style={{ color: "var(--color-ink-muted)" }}>{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function BandiFinder({ oggiBuild }: { oggiBuild: string }) {
  const [oggi, setOggi] = useState(oggiBuild);
  useEffect(() => setOggi(isoOggi()), []);

  const [regione, setRegione] = useState("");
  const [tipi, setTipi] = useState<Set<Tipo>>(new Set());
  const [chi, setChi] = useState<Set<Beneficiario>>(new Set());
  const [cosa, setCosa] = useState<Set<Copertura>>(new Set());
  const [chiusi, setChiusi] = useState(false);

  const conStato = useMemo(() => BANDI.map((b) => ({ b, s: statoDi(b, oggi) })), [oggi]);

  const filtrati = useMemo(() => {
    const ok = conStato.filter(({ b }) => {
      if (regione && b.regioni.length > 0 && !b.regioni.includes(regione)) return false;
      if (tipi.size && !tipi.has(b.tipo)) return false;
      if (chi.size && !b.beneficiari.some((x) => chi.has(x))) return false;
      if (cosa.size && !b.copre.some((x) => cosa.has(x))) return false;
      return true;
    });
    return ok.sort((x, y) => {
      if (ORDINE[x.s] !== ORDINE[y.s]) return ORDINE[x.s] - ORDINE[y.s];
      if (x.s === "aperto") return (x.b.scadenza ?? "").localeCompare(y.b.scadenza ?? "");
      if (x.s === "in-apertura") return (x.b.apertura ?? "").localeCompare(y.b.apertura ?? "");
      if (x.s === "chiuso") return (y.b.chiusoIl ?? y.b.scadenza ?? "").localeCompare(x.b.chiusoIl ?? x.b.scadenza ?? "");
      return 0;
    });
  }, [conStato, regione, tipi, chi, cosa]);

  const visibili = chiusi ? filtrati : filtrati.filter(({ s }) => s !== "chiuso");
  const nascosti = filtrati.length - visibili.length;
  const filtriAttivi = regione || tipi.size || chi.size || cosa.size || chiusi;

  const azzera = () => {
    setRegione("");
    setTipi(new Set());
    setChi(new Set());
    setCosa(new Set());
    setChiusi(false);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* ===== FILTRI ===== */}
      <div className="card !p-6 md:!p-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-2" style={{ minWidth: 240 }}>
            <span className="text-[13px] font-semibold" style={{ color: "var(--color-ink-muted)" }}>Dove ha sede l’azienda</span>
            <select
              value={regione}
              onChange={(e) => setRegione(e.target.value)}
              style={{
                minHeight: 44,
                padding: "8px 12px",
                borderRadius: 12,
                border: "1.5px solid var(--color-line-strong)",
                background: "#fff",
                color: "var(--color-ink)",
                fontSize: 15,
              }}
            >
              <option value="">Tutte le regioni</option>
              {REGIONI.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <p className="text-[13.5px] pb-2.5" style={{ color: "var(--color-ink-soft)" }}>
            Scegliendo una regione vedi i suoi bandi e quelli nazionali.
          </p>
        </div>

        <Gruppo label="Tipo di agevolazione">
          {(Object.keys(TIPO) as Tipo[]).map((t) => (
            <Chip key={t} on={tipi.has(t)} onClick={() => setTipi((s) => toggle(s, t))}>{TIPO[t]}</Chip>
          ))}
        </Gruppo>

        <Gruppo label="Per chi">
          {(Object.keys(BENEF) as Beneficiario[]).map((t) => (
            <Chip key={t} on={chi.has(t)} onClick={() => setChi((s) => toggle(s, t))}>{BENEF[t]}</Chip>
          ))}
        </Gruppo>

        <Gruppo label="Cosa finanzia">
          {(Object.keys(COPRE) as Copertura[]).map((t) => (
            <Chip key={t} on={cosa.has(t)} onClick={() => setCosa((s) => toggle(s, t))}>{COPRE[t]}</Chip>
          ))}
        </Gruppo>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-5" style={{ borderTop: "1px solid var(--color-line)" }}>
          <Chip on={chiusi} onClick={() => setChiusi((v) => !v)}>Mostra anche i chiusi</Chip>
          <div className="flex items-center gap-4">
            <p className="text-[14px] font-semibold" style={{ color: "var(--color-ink)" }} aria-live="polite">
              {visibili.length} {visibili.length === 1 ? "bando" : "bandi"}
              {nascosti > 0 && (
                <span className="font-normal" style={{ color: "var(--color-ink-soft)" }}>
                  {" "}· {nascosti} {nascosti === 1 ? "chiuso nascosto" : "chiusi nascosti"}
                </span>
              )}
            </p>
            {filtriAttivi ? (
              <button type="button" onClick={azzera} className="text-[14px] font-semibold underline" style={{ color: "var(--color-brand)" }}>
                Azzera i filtri
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* ===== ELENCO ===== */}
      {visibili.length === 0 ? (
        <div className="card !p-8 text-center">
          <p className="text-[16px]" style={{ color: "var(--color-ink-muted)" }}>Nessun bando con questi filtri.</p>
          <button type="button" onClick={azzera} className="btn btn-secondary mt-5">Azzera i filtri</button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 list-none p-0 m-0">
          {visibili.map(({ b, s }) => {
            const restano = s === "aperto" && b.scadenza ? giorniTra(oggi, b.scadenza) : null;
            const dove =
              b.area ?? (b.regioni.length === 0 ? "Tutta Italia" : b.regioni.length <= 2 ? b.regioni.join(" e ") : `${b.regioni.length} regioni`);
            return (
              <li key={b.id} className="card flex flex-col gap-4 !p-7" style={s === "chiuso" ? { opacity: 0.72 } : undefined}>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold" style={{ color: "var(--color-ink)" }}>
                    <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 999, background: DOT[s], display: "inline-block" }} />
                    {etichettaStato(b, s)}
                  </span>
                  {restano !== null && restano <= 21 && (
                    <span
                      className="text-[12.5px] font-semibold rounded-full px-2.5 py-1"
                      style={{ background: "var(--color-amber-soft)", color: "var(--color-ink)" }}
                    >
                      {restano <= 0 ? "Scade oggi" : restano === 1 ? "Scade domani" : `Scade tra ${restano} giorni`}
                    </span>
                  )}
                </div>

                <div>
                  <p className="eyebrow" style={{ color: "var(--color-brand)" }}>
                    {TIPO[b.tipo]} · {dove}
                  </p>
                  <h3 className="mt-2 text-[1.25rem] font-medium tracking-tight text-balance">{b.nome}</h3>
                  <p className="text-[14px] mt-1" style={{ color: "var(--color-ink-soft)" }}>{b.ente}</p>
                </div>

                <p className="text-[15.5px] font-semibold text-pretty" style={{ color: "var(--color-brand)" }}>{b.aiuto}</p>
                <p className="text-[15px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>{b.sintesi}</p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[14px] m-0">
                  <div>
                    <dt className="font-semibold" style={{ color: "var(--color-ink)" }}>Scadenza</dt>
                    <dd className="m-0" style={{ color: "var(--color-ink-muted)" }}>
                      {b.scadenza && !b.chiusoIl ? data(b.scadenza) : b.senzaScadenza ?? "Chiuso"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold" style={{ color: "var(--color-ink)" }}>Per chi</dt>
                    <dd className="m-0" style={{ color: "var(--color-ink-muted)" }}>{b.beneficiari.map((x) => BENEF[x]).join(", ")}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-1.5">
                  {b.copre.map((c) => (
                    <span
                      key={c}
                      className="text-[12.5px] font-medium rounded-full px-2.5 py-1"
                      style={{ background: "var(--color-brand-soft)", color: "var(--color-brand)" }}
                    >
                      {COPRE[c]}
                    </span>
                  ))}
                </div>

                <p className="text-[13.5px] leading-relaxed text-pretty rounded-xl px-4 py-3" style={{ background: "var(--color-surface)", color: "var(--color-ink-muted)" }}>
                  <span className="font-semibold" style={{ color: "var(--color-ink)" }}>Da sapere. </span>
                  {b.daSapere}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-2">
                  <a
                    href={b.fonte}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold"
                    style={{ color: "var(--color-brand)" }}
                  >
                    Bando ufficiale
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                  <span className="text-[12.5px]" style={{ color: "var(--color-ink-soft)" }}>Verificato il {data(b.verificato)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
