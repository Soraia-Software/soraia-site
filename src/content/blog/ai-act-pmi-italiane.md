---
title: "AI Act 2026 per le PMI: cosa cambia davvero in operatività"
h1: "AI Act 2026 per le PMI italiane, cosa cambia davvero in operatività"
description: "Il Regolamento europeo IA è in vigore. Per la maggior parte delle PMI italiane gli obblighi sono limitati, ma le 4 cose da fare ci sono. Guida pratica."
pubDate: 2026-04-22
updatedDate: 2026-11-06
author: "Daniel Levis"
tags: ["ai act", "compliance", "gdpr", "guide"]
readMinutes: 7
featured: false
---

L'[AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) europeo è entrato in vigore il 1 agosto 2024. Le PMI italiane stanno ricevendo email di consulenze AI che agitano lo spettro di multe fino al 7% del fatturato.

La verità operativa è molto più calma. Per la **maggior parte delle PMI**, gli obblighi diretti sono pochi e gestibili.

Ecco la mappa onesta.

## Le 4 categorie del Regolamento

L'AI Act classifica i sistemi IA in [4 livelli di rischio](https://digital-strategy.ec.europa.eu/it/policies/regulatory-framework-ai):

1. **Rischio inaccettabile**: vietati (social scoring stile Cina, sfruttamento delle vulnerabilità di minori o persone fragili, riconoscimento delle emozioni sul lavoro, ecc.). Di solito non ti riguarda, ma attenzione agli strumenti HR che deducono le emozioni dei dipendenti.
2. **Rischio alto**: scoring credito, recruitment automatico, sistemi sanitari, ecc. Obblighi pesanti, che si applicano dal 2 dicembre 2027 dopo il rinvio deciso con il [Digital Omnibus](https://eur-lex.europa.eu/eli/reg/2026/1744/oj).
3. **Rischio limitato**: chatbot client-facing. Obbligo principale: trasparenza.
4. **Rischio minimo**: tutto il resto. Nessun obbligo specifico, salvo la formazione di chi usa l'IA (art. 4), che vale per tutti.

**La domanda chiave** per la tua PMI: i tuoi agenti AI ricadono in livello 2 (alto) o 3-4 (limitato/minimo)?

## Recruitment & HR: attenzione

Se usi AI per **selezionare, filtrare o valutare** candidati, o per decidere su promozioni e valutazioni, l'AI Act ti classifica nel **livello alto**. Dal 2 dicembre 2027, chi usa questi sistemi deve:

- Seguire le istruzioni del fornitore
- Affidare la supervisione umana a persone competenti
- Conservare i log del sistema per almeno sei mesi
- Informare lavoratori e rappresentanti prima dell'uso, e i candidati che sono soggetti al sistema

Sono gli obblighi dell'art. 26; a questi si aggiunge la DPIA prevista dal GDPR.

In pratica nei nostri sprint Soraia per recruitment:
- L'agente **filtra e ranking** ma il recruiter umano firma sempre la decisione
- Manteniamo audit log immutabile su ogni decisione
- Documenti DPIA generati come deliverable
- L'agente non genera output legalmente vincolanti

Anche con il recruiter che firma, filtrare e ordinare candidati resta **alto rischio**: è profilazione, che l'AI Act considera sempre tale (art. 6). Per questo trattiamo i progetti recruitment come livello alto.

## Finance & Accounting: rischio minimo se fatto bene

Agenti che leggono fatture, fanno OCR, validano IVA, generano report, **livello minimo**. Niente decisioni autonome che impattano persone, solo automation interna.

Obbligo principale: trasparenza interna (il team deve sapere che l'agente è AI-driven).

## Sales & Marketing: minimo o limitato

Agenti che fanno outreach personalizzato, scoring lead, drafting email, di solito **livello minimo**. Diventa **limitato** se l'agente dialoga da solo con i clienti (es. follow-up automatici che portano avanti la conversazione). In quel caso:

- Va detto in modo chiaro, alla prima interazione, che dall'altra parte c'è un'IA (art. 50)
- Conviene lasciare al destinatario la possibilità di chiedere una persona

Se l'email la scrive l'IA ma la rivede e la invia una persona, non c'è un obbligo di etichetta.

## Customer Support: dipende

Chatbot frontline → **livello limitato**, devi comunicare all'utente che parla con AI, in modo chiaro e alla prima interazione.

Routing interno + drafting risposte (con umano che approva e invia) → **livello minimo**.

## I 4 step concreti per le PMI

Indipendentemente dal livello, ecco le 4 cose pratiche da fare:

### 1. AI Policy 1-pager interna

Documento di 1 pagina che dice: cosa è permesso, cosa è proibito, come si segnalano problemi. Aiuta governance + è un requisito implicito di best practice.

### 2. Log delle decisioni agent

Ogni agente in produzione deve loggare ogni decisione, con timestamp, input, output, e flag escalation. Per livello alto è obbligatorio. Per gli altri è comunque smart (debugging, accountability).

### 3. Supervisione umana sui casi critici

Definire upfront: quando l'agente decide da solo, quando passa a un umano. Per recruitment: sempre umano sull'offer finale. Per accounting: umano su anomalie >€10k. Per support: umano su escalation negative.

### 4. DPA con il vendor

Se usi un fornitore esterno (Soraia, OpenAI, Anthropic, qualunque), serve un **Data Processing Agreement** ([art. 28 GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)). Già lo facciamo in ogni nostro sprint.

## Il vantaggio Soraia per la compliance

Nei nostri sprint includiamo di default:
- **Audit log immutabile** di ogni decisione
- **DPIA template** già compilato per recruitment / finance
- **Policy 1-pager AI safe use** customizzata per il tuo team
- **Hosting UE** (no traffico extra-UE non autorizzato)
- **DPA art. 28** preincluso nel contratto

Non perché siamo eroici, ma perché senza queste cose non possiamo nemmeno fare il lavoro su settori regolamentati.

---

**Vuoi una valutazione del tuo caso specifico?** Lo facciamo nell'[analisi dei processi](/parliamone). Ti diciamo onestamente in quale livello ricadi e cosa serve fare. Oppure inizia con il [check-up 3 minuti](/check-up).
