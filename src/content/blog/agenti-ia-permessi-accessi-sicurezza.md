---
title: "Rischi sicurezza agenti AI: dagli solo gli accessi giusti"
description: "Un agente IA con troppi permessi e' una minaccia interna. Guida pratica al least-privilege: come dare a un agente solo gli accessi che gli servono."
pubDate: 2026-08-26
author: "Davide Silvestri"
tags:
  - "ai agents"
  - "security"
  - "compliance"
  - "how-to"
keywords:
  - "rischi sicurezza agenti ai aziende"
  - "permessi agenti ia"
  - "least privilege ai"
  - "sicurezza ai agent"
readMinutes: 6
featured: false
h1: "Rischi sicurezza agenti AI: dagli solo gli accessi che gli servono"
faq:
  - q: "Perche' un agente IA con troppi permessi e' un rischio?"
    a: "Perche' un agente esegue task in autonomia: se ha accesso a piu' sistemi di quanti gliene servano, un errore di prompt injection o un bug amplia il danno a tutto cio' che l'agente puo' toccare. Il principio del <strong>least privilege</strong> limita il raggio del problema. Un agente di moderazione non deve poter accedere al gestionale contabile."
  - q: "Cosa significa least privilege per un agente IA?"
    a: "Significa dare all'agente solo i permessi minimi per completare il suo compito, niente di piu'. Accesso in sola lettura dove basta leggere, scrittura limitata alle sole tabelle/cartelle in scope, credenziali dedicate all'agente e non condivise con persone. Ogni permesso in piu' e' superficie d'attacco in piu'."
  - q: "Come si verifica cosa ha fatto un agente in produzione?"
    a: "Con un <strong>audit log immutabile</strong> di ogni decisione: input ricevuto, regole applicate, output prodotto, trigger e eventuale escalation umana. Senza questo non puoi rispondere a un revisore o a un cliente su cosa l'agente abbia toccato e perche'. In Soraia e' incluso di default in ogni sprint."
  - q: "Un agente puo' agire da solo su dati sensibili?"
    a: "Puo', ma va progettato con un confine chiaro: cosa decide da solo e cosa passa a un umano. Per operazioni distruttive o irreversibili (cancellazioni, movimenti economici, decisioni su persone) si imposta sempre una supervisione umana. La regola vale ancora di piu' sotto GDPR e AI Act."
lang: "it"
gates:
  passedAt: 2026-07-25T06:55:09.818Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

Un agente IA non e' un chatbot che risponde. E' un processo che **agisce** sui tuoi sistemi: legge, scrive, cancella, notifica. E qui nasce il problema di sicurezza che la maggior parte delle aziende scopre troppo tardi.

Nel 2026 gli agenti IA sono la nuova minaccia interna. Non perche' siano cattivi, ma perche' spesso gli diamo le chiavi di tutta la casa quando gli serve una sola stanza.

**In breve:**

- Il rischio numero uno degli agenti IA non e' il modello che allucina, sono i **permessi eccessivi**: piu' accessi ha l'agente, piu' grande e' il danno se qualcosa va storto.
- Applica il **least privilege**: sola lettura dove basta leggere, scrittura limitata alle sole risorse in scope, credenziali dedicate all'agente e mai condivise con le persone.
- Ogni agente in produzione deve avere un **audit log immutabile** di input, regole applicate, output e trigger: senza, non puoi rispondere a un revisore.
- Le operazioni irreversibili (cancellazioni, movimenti economici, decisioni su persone) richiedono sempre una **supervisione umana**, non solo per GDPR e AI Act.
- Il caso Navily lo dimostra: un agente puo' fare -70% di tempo operativo restando confinato a moderazione ed enrichment, senza toccare nient'altro.

## Perche' un agente con troppi permessi e' pericoloso

Un LLM che risponde a una persona e' contenuto: sbaglia una risposta, la persona la corregge. Un agente in produzione no. Riceve un trigger, esegue, agisce nei tuoi sistemi. Se ha accesso a CRM, ERP, mailbox e file server "per comodita'", un solo problema (un prompt injection nel testo di un ticket, un bug nella logica, una credenziale esposta) si propaga a tutto cio' che l'agente puo' toccare.

La domanda giusta non e' *"l'agente e' sicuro?"*. E' *"cosa puo' fare l'agente nel peggiore dei casi?"*. E la risposta dipende da una cosa sola: quanti accessi gli hai dato.

## Least privilege in pratica, per un agente IA

Il principio e' vecchio quanto la sicurezza informatica, ma va tradotto sugli agenti. Ecco come lo applichiamo negli sprint Soraia.

### 1. Un'identita' dedicata, non quella di una persona

L'agente non usa le credenziali di un dipendente. Ha un proprio account di servizio, con permessi propri e revocabili in un click. Se domani vuoi spegnerlo, disattivi un account, non chiedi a qualcuno di cambiare la password.

### 2. Sola lettura come default

La maggior parte dei task richiede leggere molto e scrivere poco. Screening CV, moderazione, enrichment dati: sono operazioni di lettura + scrittura mirata. Parti da sola lettura ovunque, e concedi scrittura solo dove il task lo esige, sulle sole tabelle o cartelle in scope.

### 3. Scope stretto, non elastico

Definisci esattamente su quali risorse l'agente opera. Un agente di [customer support](/customer-support) tocca la coda ticket e la knowledge base, non il gestionale paghe. Uno scope chiaro non e' solo sicurezza: e' anche il motivo per cui l'agente funziona, perche' non si perde in dati che non gli servono.

### 4. Confine umano sulle operazioni irreversibili

Cancellazioni definitive, movimenti economici, decisioni che impattano persone: qui l'agente propone, un umano conferma. Non e' burocrazia, e' il modo di tenere il raggio di un errore vicino a zero. E' anche cio' che ti tiene allineato ad AI Act (in vigore per le PMI dal 2026) e GDPR.

### 5. Audit log immutabile su ogni decisione

Ogni azione dell'agente va tracciata: input ricevuto, regole applicate, output prodotto, chi/cosa ha attivato il trigger, se c'e' stata escalation. Non serve solo in caso di incidente: serve ogni volta che qualcuno ti chiede *"perche' l'agente ha fatto X?"*. In Soraia questo log e' incluso di default, altrimenti non potremmo lavorare su settori regolamentati.

## Il caso Navily: potente ma confinato

[Navily](/case-studies/navily), community per la nautica, aveva un carico enorme di moderazione UGC ed enrichment dati. L'agente che abbiamo costruito ha ridotto del **70% il tempo operativo** su quei due processi.

La parte interessante per questo articolo: l'agente e' potentissimo dentro il suo scope, e cieco fuori. Modera contenuti e arricchisce dati. Non ha accesso a pagamenti, non tocca dati che non gli servono, non puo' agire fuori dal suo perimetro. La potenza dell'agente non dipende da quanti accessi ha. Dipende da quanto e' ben progettato lo scope stretto in cui opera.

## Quando NON serve un agente autonomo

Da CTO te lo dico chiaro:

- **Task raro e ad alto impatto** (una decisione importante ogni tanto): non automatizzare, dai a una persona uno strumento LLM assistito. L'autonomia serve sul volume ripetitivo, non sull'eccezione critica.
- **Sistemi legacy senza controllo granulare dei permessi**: se il tuo gestionale da' accesso tutto-o-niente, prima risolvi quello. Costruire un agente sopra un sistema che non sa limitare gli accessi e' costruire su sabbia. Qui a volte serve prima un intervento di [software su misura](/software-development).
- **Zero governance interna**: se nessuno sa chi ha accesso a cosa oggi, aggiungere un agente peggiora il problema, non lo risolve.

## Come partiamo noi

Ogni sprint [AI Agents](/ai-agents) parte da una mappa degli accessi: cosa deve leggere l'agente, cosa deve scrivere, cosa non deve mai toccare. E' il primo deliverable di sicurezza, prima ancora del primo agente live (che arriva in 4 settimane). Least privilege non e' un extra: e' il modo in cui costruiamo, perche' un agente che puo' fare solo il suo lavoro e' anche l'agente di cui ti puoi fidare.

---

**Vuoi capire quali accessi servono davvero ai tuoi agenti?** [Parliamone](/parliamone) in 20 minuti, oppure fai il [check-up](/check-up) in 3 minuti.
