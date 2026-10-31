---
title: "Di chi è il tuo agente IA? Codice e vendor lock-in"
description: "Prima di firmare un contratto per un agente IA, chiedi chi possiede codice e dati. Le 5 domande per evitare il vendor lock-in, da un founder di un'AI agency."
pubDate: 2026-11-02
author: "Daniel Levis"
tags:
  - "vendor lock-in"
  - "custom software"
  - "ai agents"
  - "contratti"
keywords:
  - "vendor lock-in software ai"
  - "proprietà codice software"
  - "agente IA proprietà"
  - "lock-in AI"
readMinutes: 6
featured: false
h1: "Di chi è il tuo agente IA? Proprietà del codice e vendor lock-in"
faq:
  - q: "Chi possiede il codice di un agente IA sviluppato su misura?"
    a: "Dipende da cosa c'è scritto nel contratto. Per default, in assenza di clausole, il codice resta del fornitore (L. 633/1941 sul diritto d'autore). Devi pretendere una clausola esplicita di cessione della proprietà di codice e dati. In Soraia <strong>codice e dati restano del cliente dal primo giorno</strong>."
  - q: "Cosa succede ai miei dati se cambio fornitore?"
    a: "Se i dati vivono solo sull'infrastruttura del fornitore e non hai una clausola di export, rischi di non poterli portare via. Chiedi prima di firmare: formato di export, tempi di consegna, e una clausola di reversibilità che obblighi il fornitore a consegnarti tutto in caso di uscita."
  - q: "Un canone mensile è automaticamente vendor lock-in?"
    a: "No. Un canone è lock-in solo se, smettendo di pagare, perdi l'accesso a codice e dati. Un canone per ore di sviluppo e manutenzione va bene, se puoi interromperlo <strong>anche solo dopo un mese</strong> e resti proprietario di quello che è stato costruito. Distingui il canone-servizio dal canone-ostaggio."
  - q: "Come verifico che non ci sia lock-in prima di firmare?"
    a: "Leggi tre clausole: proprietà intellettuale (a chi va il codice), reversibilità (export dati e documentazione all'uscita), e dipendenze tecniche (quali piattaforme proprietarie servono per far girare il sistema). Se una di queste manca o è vaga, è un segnale di lock-in."
lang: "it"
gates:
  passedAt: 2026-10-25T08:24:36.275Z
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

La domanda che quasi nessun CEO fa prima di firmare un contratto per un agente IA è anche la più costosa da sbagliare: *di chi è il codice che stai pagando?*

Arriva sempre dopo, di solito dopo 18 mesi, quando vuoi cambiare fornitore o internalizzare e scopri che non puoi. È lì che il **vendor lock-in software ai** smette di essere una parola astratta e diventa una fattura.

**In breve:**

- Per default legale (L. 633/1941 sul diritto d'autore), il codice di un software su misura resta del fornitore: la proprietà del cliente va scritta, non si presume.
- Il lock-in non è il canone in sé, è l'impossibilità di andartene con codice e dati in mano. Distingui il canone-servizio dal canone-ostaggio.
- Tre clausole da leggere prima di firmare: proprietà intellettuale, reversibilità (export dati) e dipendenze tecniche da piattaforme proprietarie.
- In Soraia **codice e dati restano del cliente dal primo giorno**, e il primo mese è soddisfatti o rimborsati, anche solo per un mese.
- Un agente IA costruito su piattaforme no-code proprietarie che non puoi esportare è lock-in travestito da velocità.

## Perché il codice "su misura" non è automaticamente tuo

Controintuitivo, ma legalmente netto: se paghi un fornitore per sviluppare software e nel contratto non c'è una clausola esplicita di cessione, **la proprietà intellettuale resta dello sviluppatore**. La Legge 633/1941 sul diritto d'autore tutela chi scrive il codice, non chi lo commissiona, salvo patto contrario scritto.

Questo significa che puoi aver speso decine di migliaia di euro e, sulla carta, avere solo una licenza d'uso. Non il codice sorgente. Non il diritto di farlo modificare da un altro.

La clausola da pretendere suona così: *"tutti i diritti di proprietà intellettuale sul codice sviluppato e sui dati elaborati sono ceduti al Cliente"*. Se il fornitore esita, hai la tua risposta.

## Il canone non è il nemico, il canone-ostaggio sì

Facciamo chiarezza, perché qui si fanno confusioni che costano. Un canone mensile **non è** vendor lock-in di per sé.

Noi stessi lavoriamo a Sprint mensili con una quota fissa (da 8.000 € al mese). È un canone-servizio: paghi sviluppo, manutenzione e miglioramento continuo. Puoi fermarti anche dopo un mese e resti proprietario di tutto quello che è stato costruito fino a lì.

Il canone-ostaggio è un'altra cosa: smetti di pagare e il sistema si spegne, i dati restano sul server del fornitore, il codice non l'hai mai visto. Quello è lock-in.

La domanda che separa i due: **"se smetto di pagarti domani, cosa resta in mano mia?"** Se la risposta è "codice sorgente, dati esportati, documentazione", è un canone sano. Se è "niente", scappa.

## Le piattaforme no-code: velocità oggi, gabbia domani

Qui tocco un nervo scoperto, anche nostro. Molti agenti IA vengono costruiti velocemente su piattaforme no-code proprietarie. Si parte in fretta, costa poco all'inizio.

Il problema arriva dopo: quella logica di automazione **vive solo dentro quella piattaforma**. Non la esporti, non la porti via, non la fai girare altrove. Hai costruito su terra in affitto.

Per un agente che tocca processi core (screening candidati, riconciliazioni, triage ticket) questo è un rischio strutturale. Se la piattaforma cambia prezzi, viene acquisita o chiude, il tuo processo si ferma. Per questo, quando il processo è critico, serve codice che gira su infrastruttura tua (o portabile), non un flusso incastrato in un tool di terzi. È uno dei motivi per cui abbiamo spostato il baricentro verso lo [sviluppo software su misura](/software-development) con codice di proprietà.

## Le 5 domande da fare prima di firmare

1. **A chi va la proprietà intellettuale del codice?** Deve esserci una clausola di cessione esplicita al cliente.
2. **Dove vivono i dati e come li esporto?** Pretendi formato, tempi e una clausola di reversibilità.
3. **Su quali piattaforme proprietarie gira il sistema?** Più dipendenze non esportabili, più lock-in.
4. **Se smetto di pagare, cosa resta mio?** La risposta deve essere "tutto quello che hai costruito".
5. **Chi può mantenere il codice dopo di te?** Se solo il fornitore originale può toccarlo, sei legato a vita.

Se anche solo una risposta è vaga, non è un dettaglio da sistemare dopo. È un segnale.

## Quando il lock-in è un rischio accettabile

Per onestà: non sempre la proprietà totale del codice è la priorità. Se stai usando un SaaS verticale standard (un CRM, un gestionale), il lock-in è implicito e spesso ragionevole, paghi per non mantenere nulla. Va bene, a patto di saperlo e di poter esportare i dati.

Il discorso cambia quando l'agente IA incorpora **il tuo processo specifico**, il tuo vantaggio operativo. Lì, regalare la proprietà al fornitore significa regalargli il tuo know-how. Il nostro modello sugli [agenti IA custom](/ai-agents) nasce proprio per questo: automatizziamo il tuo processo, ma il risultato resta tuo.

Prima di valutare tutto questo, ti serve sapere cosa stai comprando davvero: la nostra [guida ai costi della consulenza AI](/guide/costi-consulenza-ai) spiega come leggere un preventivo senza farti sorprendere dalle voci nascoste.

## In pratica

Il vendor lock-in non si combatte con la diffidenza, si combatte con tre clausole lette bene prima di firmare. Proprietà, reversibilità, dipendenze. Chiedile a voce alta nella prima call: come reagisce il fornitore è già metà della risposta.

**Vuoi un parere onesto sul tuo caso?** [Parliamone in 20 minuti](/parliamone), senza pitch. Oppure fai il [check-up in 3 minuti](/check-up).
