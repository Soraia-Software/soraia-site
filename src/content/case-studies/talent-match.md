---
title: "Talent Match — Agente IA matching candidati per recruitment spagnolo"
client: "Talent Match"
sector: "Recruitment · Spagna"
service: "Agente IA matching candidati"
pubDate: 2026-04-02
featured: true
stakeholder:
  name: "Guillem Llacuna"
  role: "Co-Founder"
  photo: "/testimonials/guillem-llacuna.webp"
heroQuote: "Avevamo Recruit CRM, due tool di sourcing, qualche foglio Excel. Soraia ci ha consegnato una piattaforma unica con un agente IA che fa il matching JD↔candidato meglio dei nostri recruiter junior, e ora il team lavora solo sui 5-10 candidati top invece di sfogliarne 200."
teaser:
  problem: "Stack frammentato (Recruit CRM + sourcing tools + Excel), zero matching automatico, recruiter che leggono manualmente 200+ candidati per posizione."
  action: "ATS/CRM custom con agente IA matching che ranka i candidati su ogni job description, Web Clipper Chrome per cattura LinkedIn, semaforo pre-oportunidades."
  resultMetric: "6 mesi dev → produzione · algoritmo Potential Match v2 in autonomia"
  resultBody: "Il team lavora sui 5-10 candidati top per posizione invece di 200, con score motivato dall'agente."
stats:
  - value: "200 → 10"
    label: "Candidati da rivedere"
    sub: "per ogni posizione aperta"
  - value: "6 mesi"
    label: "Dal kick-off"
    sub: "alla produzione completa"
  - value: "v2"
    label: "Algoritmo matching"
    sub: "raffinato in autonomia"
timeline: "Sprint dev 6 mesi (€30k), oggi maintenance + sprint puntuali"
stack:
  - "Xano (backend)"
  - "WeWeb (frontend recruiter)"
  - "OpenAI / Anthropic (matching agent)"
  - "Google Cloud Vision (CV OCR)"
  - "Google Places API"
  - "Chrome Web Clipper custom"
related:
  - "stars-be-original"
  - "cxl"
---

## Il contesto

Talent Match è una recruitment boutique catalana fondata da Jordi Valenzuela e Guillem Llacuna, focus su placement medio-alto in industria, finance e tech. Il modello è classico headhunter: poche posizioni aperte, alta qualità, fee fisse per posizione chiusa.

Il valore di Talent Match dipende dalla **velocità con cui identifica i candidati giusti per ogni mandate**. Più tempo passa, più il cliente perde fiducia, più rischio che la posizione vada a un competitor.

## Il problema reale

Il team operava su 3 stack diversi:

- **Recruit CRM** come ATS principale, ma con limiti nel matching JD↔candidato (filtri booleani manuali, niente score AI).
- **Tool di sourcing esterni** (LinkedIn Recruiter, alcuni job board) — dati che vivevano fuori dal CRM, da copiare a mano.
- **Excel** per le shortlist da presentare al cliente.

Risultato operativo: per ogni nuova posizione il recruiter passava **5-8 ore a sfogliare 150-250 candidati** dal CRM + scraping LinkedIn, copia-incolla informazioni, costruzione manuale della shortlist. La parte "selettiva" (le ultime 30 minuti su 10 candidati top) era la sola che generava valore. Le 7+ ore prima erano data entry mascherato.

In più: nessuna metric su quali candidati funzionavano nel lungo periodo (placement successo, retention 12 mesi), quindi nessun apprendimento sui criteri di matching.

## Cosa ha fatto l'agente IA

Soraia ha costruito **Talent Match Platform**, un ATS/CRM custom che sostituisce lo stack precedente e include un agente IA dedicato al matching:

1. **Ingestion automatica** — i CV arrivano via form di candidatura, email, LinkedIn (tramite Chrome Web Clipper custom che cattura il profilo in 1 click). OCR e parsing strutturato automatici via Google Cloud Vision.
2. **Agente IA matching (Potential Match)** — per ogni JD aperto, l'agente legge i requirement, scansiona il database candidati, e produce uno **score motivato** (0-100) con le ragioni del match per ogni candidato.
3. **Filtri booleani + distanza geografica** — Google Places API per match su località fattibili.
4. **Kanban e semáforo pre-oportunidades** — vista visiva del pipeline per posizione.
5. **Algoritmo v2** — dopo i primi 6 mesi di produzione, raffinamento dell'algoritmo Potential Match con criteri più precisi + cost optimization (model più economico per pass 1, modello più potente solo sui borderline).

Il recruiter umano interviene solo sui **5-10 candidati top** che l'agente ranka per primi. Le 7 ore di data entry sono sparite.

## I risultati

**Da 200 a 10 candidati da rivedere per posizione**: il recruiter umano si concentra sui top match motivati dall'agente, non più sul sfogliamento manuale.

**6 mesi dal kick-off al go-live in produzione**: discovery + design + dev distribuito su sprint mensili, con il team Talent Match coinvolto in ogni iterazione.

**Algoritmo Potential Match v2 in autonomia**: dopo i primi 6 mesi di feedback dal team, Soraia ha raffinato l'algoritmo per più precisione e meno costo computazionale per chiamata. Ora l'agente costa meno per query e produce match più rilevanti.

**Sistema in maintenance** con sprint mensili per nuove feature richieste dal team (es. integrazione con tool di sourcing aggiuntivi, nuove metric di placement success).

## Cosa è incluso oggi

Sistema in produzione, status ACTIVE. SLA mensile fisso + sprint dev quando emergono nuove esigenze.

Talent Match è un esempio del modello "build + maintain + iterate" tipico Soraia: il primo sprint costruisce la foundation, i mesi successivi raffinano l'algoritmo sui dati reali del cliente.
