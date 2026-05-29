---
title: "Aegis Group, Piattaforma AI-nativa per 8 brand di recruitment"
client: "Aegis Group"
clientLogo: "/logos/clients/aegisgroup.webp"
industry: "recruitment-hr"
sector: "Recruitment multi-brand · HR"
service: "Agente IA ATS unificato"
pubDate: 2026-04-05
dimensioni: "51-250"
featured: true
stakeholder:
  name: "Vittorio Maiani"
  role: "Group Director"
  photo: "/testimonials/aegis_vittorio_maiani.png"
heroQuote: "Avevamo 8 brand di recruitment, ognuno con il suo Excel, le sue regole, i suoi recruiter. Jacko, la piattaforma che Soraia ci ha consegnato, è oggi l'unica fonte di verità su 2.000+ candidati, con AI che fa parsing, dedup e matching in autonomia per tutte le divisioni."
teaser:
  problem: "8 brand di recruitment del gruppo (FSI, Green Talent, Geek&Job, Lobin, luxury fashion divisions) operavano su Excel + tool legacy, con workflow frammentati, duplicate entry tra brand, zero analytics unificate."
  action: "ATS/CRM AI-nativo custom (Jacko) che sostituisce gli stack legacy: agente IA per CV extraction + parsing strutturato, deduplica cross-brand, matching candidato-posizione, workflow multi-divisione."
  resultMetric: "8 brand su un'unica piattaforma · 2.000+ candidati importati al go-live"
  resultBody: "Manager di brand diversi vedono per la prima volta lo stesso candidato senza data entry parallelo."
stats:
  - value: "8"
    label: "Brand unificati"
    sub: "in un'unica piattaforma"
  - value: "2.066"
    label: "Candidati importati"
    sub: "al go-live (feb 2026)"
  - value: "Cross-brand"
    label: "Deduplica + matching"
    sub: "agente IA in autonomia"
timeline: "V1 launch febbraio 2026, oggi sviluppo continuo + nuove divisioni"
stack:
  - "Xano (backend multi-tenant)"
  - "WeWeb (frontend recruiter)"
  - "OpenAI (CV parsing + matching)"
  - "Anthropic (eval comparativa)"
  - "Multi-brand permissions layer custom"
related:
  - "talent-match"
  - "stars-be-original"
  - "cxl"
---

## Il contesto

Aegis Group è un gruppo italiano di recruitment con 8 brand verticali distinti: FSI (industria), Green Talent (sustainability), Geek&Job (tech), Lobin, divisioni luxury fashion, e altri. Ogni brand ha il proprio team di manager, le proprie posizioni aperte, il proprio modo di lavorare il candidato.

Il valore del gruppo dipende dalla **possibilità di sfruttare cross-brand i candidati**: un profilo che non si adatta a FSI potrebbe essere perfetto per Geek&Job, e viceversa. Ma per farlo serve una piattaforma unica.

## Il problema reale

Lo stato pre-Soraia (fine 2025) era frammentato:

- **8 fogli Excel paralleli** (uno per brand), con sovrapposizioni e duplicati.
- **Tool ATS legacy** usati da alcuni brand ma non da tutti, con dati che non comunicavano tra divisioni.
- **CV ricevuti via email** parsati a mano dai manager, con accuracy variabile (errori su skill, ruoli, esperienza).
- **Duplicate entry massiccia**: lo stesso candidato finiva in Excel di FSI + Excel di Geek&Job se aveva profilo borderline, ma con dati leggermente diversi (versioni CV diverse, note diverse).
- **Zero analytics unificate**: impossibile vedere "quanti candidati ha il gruppo nei settori X", "quanti sono attivi negli ultimi 30 giorni", "quanto è il funnel medio per posizione".

In più: 8 manager di brand diversi che dovevano coordinarsi via email/Slack quando un candidato era "buono ma non per me". Inefficienza pura.

## Cosa ha fatto l'agente IA

Soraia ha costruito **Jacko**, una piattaforma ATS/CRM AI-nativa custom che sostituisce tutti i sistemi precedenti:

1. **Agente IA di CV parsing**, riceve il CV (PDF, doc, immagine), estrae i dati strutturati con accuracy molto superiore al parsing manuale. Skill, esperienze, lingue, certificazioni, ruoli precedenti, tutto strutturato in 30 secondi.
2. **Deduplica cross-brand automatica**, l'agente riconosce che "Mario Rossi, sviluppatore Java" già nel database di Geek&Job è lo stesso del CV appena arrivato nel pool FSI. Propone il merge, mantenendo la storia di interazione con entrambi i brand.
3. **Matching candidato↔posizione cross-brand**, quando arriva una nuova candidatura, l'agente scansiona le posizioni aperte di tutti gli 8 brand e propone match rilevanti. Il candidato che si è proposto per "FSI - Operations Manager" potrebbe essere segnalato anche al brand "Lobin" che cerca un profilo simile.
4. **Workflow multi-brand con permessi granulari**, ogni manager vede e gestisce i candidati del proprio brand, ma può collaborare con altri brand su candidati cross-funzionali.
5. **Analytics unificate**, dashboard con metric su tutto il gruppo: candidati attivi, time-to-fill medio, conversion rate per brand, ROI per sourcing channel.

I manager dei brand intervengono dove serve giudizio strategico: contatto candidato, interview, decisione finale. La parte operativa (parsing, dedup, prima qualifica) è gestita dall'agente.

## I risultati

**8 brand del gruppo su un'unica piattaforma**: per la prima volta nella storia di Aegis, tutti i manager lavorano sullo stesso database con regole condivise.

**2.066 candidati importati e dedupplicati al go-live** (febbraio 2026): la migrazione dagli Excel precedenti ha fatto emergere centinaia di duplicati che prima erano invisibili.

**Cross-brand discovery**: candidati che prima erano "incastrati" nel brand di prima registrazione oggi sono visibili a tutti i manager rilevanti, aumentando la probabilità di placement.

**Workflow standardizzati ma con personalizzazione per brand**: ogni divisione mantiene le proprie regole specifiche (es. luxury fashion ha criteri diversi da tech recruitment), ma il sottostrato è unico.

## Cosa è incluso oggi

Sistema in produzione, status ACTIVE con sviluppo continuo. Sprint mensili di evoluzione (nuove integrazioni, ottimizzazioni AI matching, nuove divisioni del gruppo da onboardare).

Aegis è uno dei case più ambiziosi del portfolio Soraia in termini di scope (multi-brand, multi-team, AI integrata in tutto il funnel recruitment) e di partnership strategica di lungo periodo con il cliente.
