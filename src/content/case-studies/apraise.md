---
title: "APraise — Agente IA ATS con Web Clipper LinkedIn per executive search"
client: "APraise"
clientLogo: "/logos/clients/apraise.webp"
industry: "recruitment-hr"
sector: "Executive search · Senior recruitment"
service: "Agente IA ATS + Web Clipper candidati"
pubDate: 2026-03-05
featured: false
stakeholder:
  name: "Jacopo Castano"
  role: "Managing Partner"
  photo: "/testimonials/jacopo-castano-apraise.png"
heroQuote: "Il nuovo sistema è come avere quattro recruiter in più nel team, senza il costo e la complessità. Aggiungiamo un candidato in un click dal LinkedIn del nostro target, e l'agente IA lo qualifica e ce lo propone sulla giusta posizione."
teaser:
  problem: "Executive search su profili senior: copia-incolla manuale dei profili LinkedIn nell'ATS, matching JD↔candidato fatto a memoria del consulente, database frammentato tra Excel e tool legacy."
  action: "ATS custom con Chrome Web Clipper che cattura il profilo LinkedIn in 1 click, agente IA per parsing strutturato + matching via vector DB, feature Potential Match per ranking automatico sulla giusta posizione."
  resultMetric: "1 click da LinkedIn al database arricchito · 150+ candidati gestiti per posizione enterprise"
  resultBody: "I consulenti senior si concentrano sui contatti e sulle conversazioni, non sul data entry."
stats:
  - value: "1 click"
    label: "Da LinkedIn al CRM"
    sub: "via Web Clipper Chrome"
  - value: "150+"
    label: "Candidati per posizione"
    sub: "su clienti enterprise"
  - value: "Vector DB"
    label: "Matching JD↔candidato"
    sub: "agente IA in autonomia"
timeline: "15+ mesi di produzione continuativa"
stack:
  - "Xano (backend)"
  - "WeWeb (frontend consulente)"
  - "OpenAI (parsing + matching)"
  - "Vector database (semantic match)"
  - "Chrome Web Clipper custom"
  - "LinkedIn integration via clipper"
related:
  - "talent-match"
  - "aegis"
  - "stars-be-original"
---

## Il contesto

APraise è una boutique italiana di **executive search** che lavora su mandati senior per clienti enterprise. Il modello business è quello classico dell'executive search: poche posizioni aperte alla volta, ognuna molto qualificata, fee proporzionali alla seniority del placement, deadline strette imposte dal cliente finale.

Il valore di APraise dipende dalla **velocità con cui può identificare e qualificare profili senior** che spesso non sono nel mercato attivo (passive candidates da scovare su LinkedIn, eventi di settore, network personale).

## Il problema reale

L'executive search ha caratteristiche operative che il software ATS generico non gestisce bene:

- **La maggior parte dei candidati arriva via sourcing attivo su LinkedIn**, non via candidatura spontanea. Il consulente passa ore a navigare profili LinkedIn target, copiando manualmente nome, ruolo, azienda, esperienza, formazione nell'ATS aziendale.
- **Il matching JD↔candidato è fatto a memoria** dei consulenti senior che ricordano "ho avuto Mario Rossi sei mesi fa, è perfetto per questa posizione". Competenza preziosa ma non scalabile.
- **Database frammentato** tra Excel (per i mandati attivi), tool ATS legacy (per lo storico), e LinkedIn (per il sourcing). Tre fonti di verità, zero matching cross-source.
- **Su mandati enterprise**, un singolo cliente può richiedere 150+ candidati gestiti per posizione: senza tooling efficiente il funnel collassa.

Risultato operativo: il consulente senior — figura costosa, che dovrebbe parlare con clienti e candidati — passava una **quota significativa del tempo in data entry manuale**.

## Cosa ha fatto l'agente IA

Soraia ha costruito **APraise ATS**, piattaforma custom che combina ingestion ultra-rapida + agente IA di matching:

1. **Chrome Web Clipper custom** — il consulente naviga su LinkedIn, trova il profilo target, clicca l'estensione: in **1 click** il profilo viene catturato e inviato all'ATS.
2. **Agente IA di parsing strutturato** — il profilo grezzo viene processato dall'agente che estrae dati strutturati con accuracy alta: ruolo attuale, esperienze precedenti, anni di seniority, skill, lingue, formazione, settori di esperienza.
3. **Vector database per matching semantico** — ogni candidato e ogni JD vengono rappresentati come vettori; l'agente calcola la similarità e propone i match più rilevanti.
4. **Feature Potential Match** — per ogni nuova posizione aperta, l'agente scansiona il database e produce una shortlist motivata con score. Il consulente rivede e contatta, l'agente non scrive mai messaggi al posto del consulente (giudizio relazionale = umano).
5. **Workflow per cliente enterprise** — gestione di 150+ candidati per posizione su un singolo mandato, con stati strutturati (contattato / interview / shortlist / presentato / closed).

Il consulente senior recupera ore al giorno per parlare con clienti e candidati. La parte operativa è gestita dall'agente.

## I risultati

**1 click da LinkedIn al database** arricchito: ciò che prima richiedeva 3-5 minuti di copia-incolla manuale per profilo, oggi è 1 click + revisione di pochi secondi.

**150+ candidati gestiti per posizione enterprise**: il funnel di executive search funziona alla scala richiesta dai clienti di fascia alta.

**Matching semantico via vector DB**: il consulente non deve più ricordare "chi sarebbe perfetto per questa posizione" — l'agente lo propone in autonomia con score motivato.

**15+ mesi di produzione continuativa** del sistema: indicatore di solidità operativa e di adattamento dell'agente ai workflow specifici di APraise.

## Cosa è incluso oggi

Sistema in produzione, status ACTIVE. SLA mensile fisso per maintenance + sprint puntuali quando emergono nuove esigenze (es. nuovi tipi di filtro, integrazioni con piattaforme aggiuntive, raffinamento del modello di matching).

APraise è un esempio del modello "ingestion + matching" che Soraia applica a diversi clienti recruitment (Talent Match, Aegis, Stars Be Original): l'angolo specifico per APraise è l'estensione Chrome che riduce la barriera di sourcing al minimo possibile.
