import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface LeadFormProps {
  lang?: "it" | "en";
  source?: string;
}

const labels = {
  it: {
    title: "Parliamo dei tuoi processi",
    subtitle:
      "Lasciaci due righe sulla tua azienda. Ti ricontattiamo entro 24 ore con una proposta di assessment.",
    name: "Nome e cognome",
    company: "Azienda",
    role: "Ruolo",
    email: "Email aziendale",
    recruiters: "Dimensione del team",
    message: "Cosa vorresti automatizzare o migliorare?",
    submit: "Richiedi assessment",
    submitting: "Invio in corso…",
    success: "Ricevuto. Ti scriviamo entro 24 ore.",
    error: "Qualcosa è andato storto. Scrivici a hello@soraia.io",
    privacy:
      "I tuoi dati restano riservati. Niente newsletter, niente terze parti.",
    range_1: "1–10 persone",
    range_2: "11–50 persone",
    range_3: "51–200 persone",
    range_4: "200+ persone",
  },
  en: {
    title: "Let's talk about your processes",
    subtitle:
      "A couple of lines about your company. We'll reply within 24 hours with an assessment proposal.",
    name: "Full name",
    company: "Company",
    role: "Role",
    email: "Work email",
    recruiters: "Team size",
    message: "What would you like to automate or improve?",
    submit: "Request assessment",
    submitting: "Sending…",
    success: "Got it. We'll reach out within 24 hours.",
    error: "Something went wrong. Write to hello@soraia.io",
    privacy: "Your data stays private. No newsletter, no third parties.",
    range_1: "1–10 people",
    range_2: "11–50 people",
    range_3: "51–200 people",
    range_4: "200+ people",
  },
} as const;

export default function LeadForm({ lang = "it", source = "recruitment" }: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const t = labels[lang];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, source, lang, ts: new Date().toISOString() };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "unknown");
    }
  }

  return (
    <div className="card !p-8 md:!p-10 shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-ink-900 tracking-tight">
          {t.title}
        </h3>
        <p className="mt-3 text-ink-600 leading-relaxed">{t.subtitle}</p>
      </div>

      {status === "success" ? (
        <div className="rounded-xl bg-violet-50 border border-violet-200 p-6 text-center">
          <div className="inline-flex w-12 h-12 rounded-full bg-violet-600 items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-violet-900">{t.success}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field name="name" label={t.name} required />
            <Field name="company" label={t.company} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field name="role" label={t.role} />
            <Field name="email" type="email" label={t.email} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              {t.recruiters}
            </label>
            <select
              name="recruiters"
              required
              className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 focus:border-violet-600 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-all"
            >
              <option value="">·</option>
              <option value="1-5">{t.range_1}</option>
              <option value="6-15">{t.range_2}</option>
              <option value="16-40">{t.range_3}</option>
              <option value="40+">{t.range_4}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              {t.message}
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 focus:border-violet-600 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? t.submitting : t.submit}
            {status !== "loading" && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            )}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600 font-medium">
              {t.error} {errorMsg && <span className="opacity-60">({errorMsg})</span>}
            </p>
          )}

          <p className="text-xs text-ink-500 pt-2">{t.privacy}</p>
        </form>
      )}
    </div>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

function Field({ name, label, type = "text", required }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700 mb-2">
        {label} {required && <span className="text-violet-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-all"
      />
    </div>
  );
}
