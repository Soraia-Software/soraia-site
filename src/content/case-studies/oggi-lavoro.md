---
title: "Oggi Lavoro, Replatforming AI di 108.000 candidati"
client: "Oggi Lavoro"
clientLogo: "/logos/clients/oggilavoro.webp"
industry: "recruitment-hr"
sector: "Agenzia per il lavoro · Somministrazione"
service: "Agente IA candidate search e matching"
pubDate: 2026-05-10
dimensioni: "51-250"
featured: false
stakeholder:
  name: "Francesca Sorrentino"
  role: "Responsabile Sistemi Informativi"
  photo: ""
heroQuote: "Avevamo 108.000 candidati su uno stack enterprise legacy che faceva fatica anche solo a cercarli. Soraia sta costruendo la nuova piattaforma da zero, con un agente IA di search e matching che cambia il modo di lavorare dei nostri recruiter."
teaser:
  problem: "108.000 candidati gestiti su stack legacy frammentato, ricerca lenta, matching manuale, mobile non disponibile, OCR CV su sistemi separati."
  action: "Replatforming completo con agente IA di candidate search (filtri booleani + distanza geografica + matching AI), Google Cloud Vision OCR su CV, mobile app planning, AI matching integrato."
  resultMetric: "108.000 candidati importati · piattaforma nuova in costruzione"
  resultBody: "Sprint dev 150h/mese in corso, transizione progressiva dal sistema legacy."
stats:
  - value: "108.000"
    label: "Candidati importati"
    sub: "dallo stack legacy"
  - value: "150h"
    label: "Sprint dev mensili"
    sub: "in corso"
  - value: "AI search"
    label: "Frontend recruiter"
    sub: "filtri booleani + distanza"
timeline: "Sprint dev attivo da Q1 2026, transizione progressiva 3-4 mesi"
stack:
  - "Xano (backend)"
  - "WeWeb (frontend recruiter)"
  - "OpenAI (AI matching)"
  - "Google Cloud Vision (CV OCR)"
  - "MailChimp (campaign)"
  - "Mobile app (FlutterFlow, planning)"
related:
  - "aegis"
  - "talent-match"
  - "stars-be-original"
---

## Il contesto

Oggi Lavoro è un'**agenzia per il lavoro / somministrazione** italiana con sede a Torino. Il modello business è classico del settore: gestione di un grande pool di candidati attivi, matching su richieste cliente, gestione contrattuale della somministrazione (paghe, contributi, normativa).

Il valore di Oggi Lavoro dipende dalla **velocità con cui trova il candidato giusto** per ogni richiesta cliente. Più tempo passa dalla richiesta del cliente al CV consegnato, più alta la probabilità di perdere la commessa a un competitor.

## Il problema reale

Lo stato pre-Soraia era pesantemente legacy:

- **Gestionale enterprise legacy** come sistema principale (robusto ma lento e poco flessibile).
- **Tool aggiuntivi** dedicati a workflow specifici.
- **SMS separato** per le comunicazioni candidati.
- **108.000 candidati** nel database, con ricerche lente (filtri base) e zero matching automatico.
- **Niente mobile**: il recruiter sul campo (visita cliente, fiera, evento) non aveva accesso veloce al database.
- **OCR CV** gestito su sistemi separati con accuracy variabile.

Risultato operativo: il recruiter aveva accesso a un database ricco ma con strumenti di ricerca primitivi. Le posizioni più urgenti finivano gestite "a memoria" dei recruiter senior che ricordavano i candidati giusti, competenza preziosa ma non scalabile.

## Cosa sta facendo l'agente IA

Soraia sta costruendo da zero la **nuova piattaforma Oggi Lavoro**, in transizione progressiva dal sistema legacy:

1. **Frontend AI candidate search**, interfaccia recruiter completamente nuova: filtri booleani sui criteri (skill, esperienza, lingue, certificazioni), filtro per distanza geografica dalla sede cliente, AI matching che propone i candidati più rilevanti per ogni richiesta.
2. **Google Cloud Vision OCR sui CV**, parsing strutturato dei nuovi CV in ingresso, accuracy molto superiore al sistema legacy. Skill, esperienze, lingue, certificazioni estratte automaticamente.
3. **AI matching agente**, quando arriva una nuova richiesta cliente, l'agente scansiona il database e propone una shortlist motivata. Il recruiter rivede e contatta.
4. **Mobile app in planning**, il recruiter sul campo potrà accedere al database, registrare nuovi contatti, attivare matching da smartphone.
5. **Integrazione MailChimp**, campaign automation per candidate engagement, talent pool nurturing.

Il sistema legacy attuale rimane operativo durante la transizione: la migrazione avviene per fasi, brand per brand del gruppo.

## I risultati attesi

**108.000 candidati importati** dal sistema legacy nella nuova piattaforma, dedupplicati e arricchiti dall'AI parsing.

**Sprint dev 150h/mese** attivi, con go-live progressivo della nuova piattaforma in 3-4 mesi dal kickoff.

**Nuovo modello operativo** per il recruiter: dalla ricerca manuale su filtri base al matching AI su candidate database arricchito, con accesso mobile per il recruiter sul campo.

**Mobile app dedicata** in roadmap per il recruiter on-the-go: requisito chiave per il modello commerciale Oggi Lavoro che richiede presenza territoriale.

## Cosa è incluso oggi

Sprint dev attivo, status ACTIVE. Si tratta del **deal più grande del portfolio Soraia 2026** in termini di volume mensile, con un team dedicato sui 150 ore/mese di sviluppo.

Oggi Lavoro è un esempio di **replatforming completo** che Soraia sta gestendo come partner tecnologico permanente: non un singolo sprint, ma una collaborazione di lunga durata che ripensa l'intera infrastruttura digitale dell'agenzia.

> Nota: questo case study descrive un progetto in fase di esecuzione attiva. I risultati misurati arriveranno con il go-live progressivo nei prossimi 3-4 mesi.
