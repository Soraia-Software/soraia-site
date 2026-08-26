import { useState, useEffect, useRef, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const TURNSTILE_SITE_KEY = (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined) || "0x4AAAAAAEGDPCQOCz6S5OWm";
const MAX_MB = 8;
const ACCEPT = ".pdf,.doc,.docx";
const ACCEPT_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

interface Props {
  roleSlug: string;
  roleTitle: string;
}

export default function ApplicationForm({ roleSlug, roleTitle }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileErr, setFileErr] = useState("");
  const renderedAt = useRef<number>(Date.now());
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const mount = () => {
      if (window.turnstile && widgetRef.current && !widgetRef.current.hasChildNodes()) {
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (t: string) => setTurnstileToken(t),
          "error-callback": () => setTurnstileToken(""),
          "expired-callback": () => setTurnstileToken(""),
        });
      }
    };
    if (window.turnstile) mount();
    else {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true; s.defer = true; s.onload = mount;
      document.head.appendChild(s);
    }
    return () => { if (widgetIdRef.current && window.turnstile) { try { window.turnstile.remove(widgetIdRef.current); } catch { /* noop */ } } };
  }, []);

  function validateFile(f: File | undefined | null): string {
    if (!f) return "Allega il tuo CV (PDF, DOC o DOCX).";
    if (f.size > MAX_MB * 1024 * 1024) return `Il file supera ${MAX_MB} MB. Comprimilo o esporta un PDF più leggero.`;
    const okExt = /\.(pdf|docx?|)$/i.test(f.name) && /\.(pdf|docx?)$/i.test(f.name);
    if (!okExt && !ACCEPT_MIME.includes(f.type)) return "Formato non valido: usa PDF, DOC o DOCX.";
    return "";
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFileName(f?.name || "");
    setFileErr(validateFile(f));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const cv = fd.get("cv") as File | null;
    const fe = validateFile(cv);
    if (fe) { setFileErr(fe); return; }

    setStatus("loading"); setErrorMsg("");
    let attr: Record<string, string> = {};
    try { attr = JSON.parse(localStorage.getItem("soraia_attr") || "{}"); } catch { /* noop */ }
    fd.append("role", roleSlug);
    fd.append("roleTitle", roleTitle);
    fd.append("rt", String(renderedAt.current));
    fd.append("turnstileToken", turnstileToken);
    fd.append("ts", new Date().toISOString());
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "referrer", "landing_page"]) {
      if (attr[k]) fd.append(k, attr[k]);
    }

    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      if (res.status === 403) {
        setTurnstileToken("");
        if (widgetIdRef.current && window.turnstile) { try { window.turnstile.reset(widgetIdRef.current); } catch { /* noop */ } }
        setStatus("error"); setErrorMsg("Verifica di sicurezza non superata. Riprova tra un istante.");
        return;
      }
      if (res.status === 413) { setStatus("error"); setErrorMsg(`Il CV è troppo grande (max ${MAX_MB} MB).`); return; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success"); form.reset(); setFileName("");
    } catch (err) {
      setStatus("error"); setErrorMsg(err instanceof Error ? err.message : "unknown");
    }
  }

  if (status === "success") {
    return (
      <div className="card !p-8 shadow-lg text-center">
        <div className="inline-flex w-12 h-12 rounded-full bg-violet-600 items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <p className="text-lg font-semibold text-violet-900">Candidatura ricevuta. Grazie!</p>
        <p className="mt-2 text-ink-600 text-[15px]">La leggiamo noi founder. Se il profilo è in linea ti ricontattiamo. Per questo ruolo, ricorda: il modo migliore per farti notare resta una cold call a Daniel.</p>
      </div>
    );
  }

  const input = "w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-all";
  const label = "block text-sm font-medium text-ink-700 mb-2";

  return (
    <div className="card !p-8 md:!p-10 shadow-lg">
      <h3 className="text-2xl font-bold text-ink-900 tracking-tight">Candidati</h3>
      <p className="mt-2 text-ink-600 leading-relaxed text-[15px]">Carica il CV e i tuoi contatti: la candidatura arriva direttamente a Daniel e Davide.</p>

      <form onSubmit={onSubmit} className="mt-7 space-y-5">
        {/* Honeypot */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="company_website">Website</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={label}>Nome e cognome <span className="text-violet-600">*</span></label>
            <input id="name" name="name" type="text" required className={input} />
          </div>
          <div>
            <label htmlFor="email" className={label}>Email <span className="text-violet-600">*</span></label>
            <input id="email" name="email" type="email" required className={input} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className={label}>Telefono</label>
            <input id="phone" name="phone" type="tel" className={input} />
          </div>
          <div>
            <label htmlFor="linkedin" className={label}>LinkedIn o portfolio</label>
            <input id="linkedin" name="linkedin" type="url" placeholder="https://" className={input} />
          </div>
        </div>

        <div>
          <label htmlFor="cv" className={label}>CV <span className="text-violet-600">*</span> <span className="font-normal text-ink-500">(PDF, DOC o DOCX, max {MAX_MB} MB)</span></label>
          <input id="cv" name="cv" type="file" accept={ACCEPT} required onChange={onFileChange}
            className="w-full text-[14px] text-ink-700 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-[13px] file:font-semibold file:bg-violet-50 file:text-violet-800 hover:file:bg-violet-100 file:cursor-pointer" />
          {fileName && !fileErr && <p className="mt-1.5 text-[13px] text-ink-500">Allegato: {fileName}</p>}
          {fileErr && <p className="mt-1.5 text-[13px] text-red-600 font-medium">{fileErr}</p>}
          <p className="mt-2 text-[12px] text-ink-500 leading-relaxed">Non inserire nel CV o nel messaggio dati particolari (art. 9 GDPR): stato di salute o disabilità, origine etnica, convinzioni religiose o politiche, appartenenza sindacale. Non ci servono per valutarti e ti chiediamo di ometterli.</p>
        </div>

        <div>
          <label htmlFor="message" className={label}>Due righe su di te (facoltativo)</label>
          <textarea id="message" name="message" rows={4} className={`${input} resize-none`} placeholder="Perché tu, per questo ruolo? Numeri, se ne hai." />
        </div>

        {TURNSTILE_SITE_KEY && <div ref={widgetRef} className="cf-turnstile" />}

        <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-ink-600">
          <input type="checkbox" name="presa_visione" required className="mt-1 w-4 h-4 flex-shrink-0 accent-violet-600" />
          <span>
            Ho letto l'<a href="/privacy#candidati" target="_blank" rel="noopener" className="text-violet-700 underline">informativa privacy per i candidati</a> e confermo che i dati e il CV che invio possono essere usati per valutare questa candidatura. <span className="text-violet-600">*</span>
          </span>
        </label>

        <p className="text-[12px] text-ink-500 leading-relaxed">
          Titolare del trattamento: Soraia S.r.l., Via Losana 13, 13900 Biella (BI), info@soraia.io. I dati e il CV sono trattati solo per valutare la tua candidatura, sulla base di misure precontrattuali su tua richiesta (art. 6.1.b GDPR) e del nostro legittimo interesse alla selezione (art. 6.1.f); il trattamento non si basa sul consenso. Sono visibili ai soci fondatori di Soraia e trasmessi tramite il fornitore di posta transazionale Brevo (responsabile ex art. 28 GDPR). Conservazione: massimo 12 mesi dalla chiusura della selezione, poi cancellazione. Puoi esercitare i diritti di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione, e proporre reclamo al Garante, scrivendo a info@soraia.io.
        </p>

        <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
          {status === "loading" ? "Invio in corso…" : "Invia candidatura"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-600 font-medium">{errorMsg || "Qualcosa è andato storto. Scrivici a info@soraia.io"}</p>
        )}
      </form>
    </div>
  );
}
