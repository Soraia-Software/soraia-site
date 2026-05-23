---
title: "AI Act 2026 per le PMI italiane, cosa cambia davvero in operatività"
description: "Il Regolamento europeo IA è in vigore. Per la maggior parte delle PMI italiane gli obblighi sono limitati, ma le 4 cose da fare ci sono. Guida pratica."
pubDate: 2026-04-22
author: "Daniel Levis"
tags: ["ai act", "compliance", "gdpr", "guide"]
readMinutes: 7
featured: false
---

L'AI Act europeo è entrato in vigore. Le PMI italiane stanno ricevendo email di consulenze AI che agitano lo spettro di multe fino al 7% del fatturato.

La verità operativa è molto più calma. Per il **90% delle PMI**, gli obblighi diretti sono pochi e gestibili.

Ecco la mappa onesta.

## Le 4 categorie del Regolamento

L'AI Act classifica i sistemi IA in 4 livelli di rischio:

1. **Rischio inaccettabile**: vietati (social scoring stile Cina, sfruttamento minori, ecc.). Non ti riguarda.
2. **Rischio alto**: scoring credito, recruitment automatico, sistemi sanitari, ecc. Obblighi pesanti.
3. **Rischio limitato**: chatbot client-facing. Obbligo principale: trasparenza.
4. **Rischio minimo**: tutto il resto. Obblighi residuali.

**La domanda chiave** per la tua PMI: i tuoi agenti AI ricadono in livello 2 (alto) o 3-4 (limitato/minimo)?

## Recruitment & HR: attenzione

Se usi AI per **decidere o influenzare significativamente** assunzioni, promozioni, valutazioni, l'AI Act ti classifica nel **livello alto**. Obblighi:

- Risk assessment documentato
- Logging completo delle decisioni
- Supervisione umana sui casi limite
- Comunicazione ai candidati che AI è coinvolta nel processo
- Conservazione record per 6 anni

In pratica nei nostri sprint Soraia per recruitment:
- L'agente **filtra e ranking** ma il recruiter umano firma sempre la decisione
- Manteniamo audit log immutabile su ogni decisione
- Documenti DPIA generati come deliverable
- L'agente non genera output legalmente vincolanti

Questo ci tiene **a cavallo tra livello alto (assistito) e limitato (humano sempre nel loop)**. Per essere safe, trattiamo i progetti recruitment come livello alto.

## Finance & Accounting: rischio minimo se fatto bene

Agenti che leggono fatture, fanno OCR, validano IVA, generano report, **livello minimo**. Niente decisioni autonome che impattano persone, solo automation interna.

Obbligo principale: trasparenza interna (il team deve sapere che l'agente è AI-driven).

## Sales & Marketing: limitato

Agenti che fanno outreach personalizzato, scoring lead, drafting email, **livello limitato**. Se l'output va a un cliente esterno (es. email di follow-up automatico), occorre:

- Indicazione che è stata generata con assistenza AI (dove appropriato)
- Possibilità per il destinatario di chiedere intervento umano

## Customer Support: dipende

Chatbot frontline → **livello limitato**, devi comunicare all'utente che parla con AI.

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

Se usi un fornitore esterno (Soraia, OpenAI, Anthropic, qualunque), serve **Data Processing Agreement art. 28 GDPR**. Già lo facciamo in ogni nostro sprint.

## Il vantaggio Soraia per la compliance

Nei nostri sprint includiamo di default:
- **Audit log immutabile** di ogni decisione
- **DPIA template** già compilato per recruitment / finance
- **Policy 1-pager AI safe use** customizzata per il tuo team
- **Hosting UE** (no traffico extra-UE non autorizzato)
- **DPA art. 28** preincluso nel contratto

Non perché siamo eroici, ma perché senza queste cose non possiamo nemmeno fare il lavoro su settori regolamentati.

---

**Vuoi una valutazione del tuo caso specifico?** Lo facciamo nell'[AI Readiness Assessment €2.000](/ai-agents). Ti diciamo onestamente in quale livello ricadi e cosa serve fare. Oppure inizia con il [check-up 3 minuti](/check-up).
