---
title: "Schedulazione a capacità finita: il piano fuori da Excel"
description: "Schedulazione a capacità finita per la PMI manifatturiera: lo schedulatore legge ERP e MES, considera persone, assenze e terzisti e confronta gli scenari."
pubDate: 2026-11-26
author: "Daniel Levis"
tags:
  - "manifattura"
  - "produzione"
  - "software su misura"
  - "how-to"
keywords:
  - "schedulazione a capacità finita"
  - "schedulatore di produzione PMI"
  - "pianificazione produzione Excel"
  - "APS ERP MES"
readMinutes: 6
featured: false
h1: "Schedulazione a capacità finita: il piano di produzione che si aggiorna da solo"
faq:
  - q: "Serve cambiare gestionale o MES?"
    a: "No. Lo schedulatore legge i dati dal gestionale e dal MES e restituisce la sequenza e le date previste, senza modificare gli ordini dell’MRP. È un livello in più, non un sostituto."
  - q: "Tiene conto di assenze e terzisti?"
    a: "Sì: assenze, turni extra e lavorazioni conto terzi entrano nel calcolo, insieme alle competenze di ogni operatore. Sono proprio gli imprevisti che oggi costringono a rifare il piano su Excel."
  - q: "Si possono confrontare piani diversi?"
    a: "Sì. Lo schedulatore mette a confronto scenari diversi, per esempio su lotti e calendari, e mostra ritardi e criticità per ordine prima che il piano venga approvato."
  - q: "Dove entra l’intelligenza artificiale?"
    a: "Non è il centro del progetto. Il valore sta nelle regole di pianificazione scritte insieme a chi pianifica, perché uno schedulatore deve dare risultati spiegabili e ripetibili."
  - q: "Quanto tempo serve per partire?"
    a: "Il primo rilascio va in produzione in <strong>4 settimane</strong>. Si parte da un reparto, per esempio il montaggio, e si estende agli altri quando le regole hanno dimostrato di reggere."
lang: "it"
draft: false
---

In molte officine il piano di produzione nasce da export del gestionale e del MES incollati in Excel. Funziona finché non succede niente. Poi un operatore si ammala, un terzista ritarda, un ordine urgente scavalca la fila, e il piano va rifatto da capo, spesso dall'unica persona che sa come farlo.

La schedulazione a capacità finita pianifica la produzione sulla capacità reale di macchine e persone, invece che su una capacità teorica illimitata. Per una PMI manifatturiera significa avere un piano che regge agli imprevisti e si aggiorna da solo.

**In breve:**
- La schedulazione a capacità finita assegna gli ordini ai centri di lavoro e agli operatori in base alla capacità reale, tenendo conto di competenze, turni e assenze.
- L'MRP calcola cosa serve e per quando, ma presuppone una capacità illimitata: per questo il piano operativo finisce spesso su Excel.
- Uno schedulatore su misura legge da solo ERP e MES, considera operatori, assenze e lavorazioni dei terzisti, e confronta gli scenari prima di approvare il piano.
- Si può partire da un reparto, per esempio il montaggio, senza toccare gli ordini dell'MRP.
- Il valore non è l'intelligenza artificiale: sono le regole di pianificazione scritte insieme a chi pianifica.

## Capacità finita o MRP: che differenza c'è?

L'MRP del gestionale risponde a una domanda: cosa produrre e acquistare, e per quando, dato il fabbisogno. Non si chiede se il reparto ha davvero le ore per farlo. La schedulazione a capacità finita parte dall'altro lato: quante ore hanno davvero ogni centro di lavoro e ogni operatore questa settimana, e in che ordine conviene lavorare gli ordini perché le date reggano.

Le due cose non sono in concorrenza. L'MRP resta il motore dei fabbisogni; lo schedulatore decide la sequenza operativa e dice per tempo quali ordini sono a rischio.

## Perché il piano su Excel smette di funzionare

Il foglio di pianificazione ha tre limiti che crescono con l'azienda:

- **si aggiorna a mano**, quindi è vecchio appena qualcosa cambia in reparto;
- **vive nella testa di chi lo fa**: le regole, come chi sa fare cosa e quali lavorazioni vanno insieme, non sono scritte da nessuna parte;
- **non permette di confrontare alternative**: rifare il piano due volte per vedere quale va meglio richiede ore.

## Cosa fa lo schedulatore che abbiamo progettato

Per un costruttore di macchine movimento terra abbiamo progettato uno schedulatore a capacità finita che prende il posto del piano su Excel:

- **piano per centro di lavoro e per operatore**, con le competenze di ciascuno;
- **assenze, turni extra e lavorazioni conto terzi** inclusi nel calcolo;
- **scenari a confronto**, per esempio su lotti e calendari diversi, prima di approvare il piano;
- **ritardi e criticità per ordine**, visibili prima che diventino problemi;
- **aggiornamento automatico** dai dati del gestionale e del MES.

L'intelligenza artificiale qui non è centrale. Il valore sta nelle regole di pianificazione, codificate insieme a chi pianifica: sono quelle che oggi esistono solo nella sua esperienza.

## Come si collega a ERP e MES

Lo schedulatore non sostituisce né il gestionale né il MES: li legge. È il confine descritto dallo standard [ISA-95](https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard), noto anche come [IEC 62264](https://webstore.iec.ch/en/publication/6675), che riguarda proprio l'interfaccia tra il livello dei sistemi gestionali e quello dei sistemi di produzione. In pratica:

- dal **gestionale** arrivano ordini e date richieste;
- dal **MES** arrivano avanzamenti e tempi reali;
- lo **schedulatore** restituisce la sequenza e le date previste, senza modificare gli ordini dell'MRP.

Che il gestionale sia TeamSystem, Zucchetti, Odoo o un sistema più datato, l'approccio non cambia: ne parliamo in [agenti IA nel gestionale](/blog/agenti-ia-gestionali-teamsystem-zucchetti-odoo/).

## Da dove partire senza rischi

Il progetto che abbiamo disegnato parte dal montaggio, senza toccare gli ordini dell'MRP. È una scelta che riduce il rischio: lo schedulatore lavora accanto ai sistemi esistenti, il reparto lo usa sul piano reale, e solo quando le regole reggono si estende ad altri reparti.

## Quando non serve uno schedulatore su misura

- **Produzione ripetitiva e stabile**: se gli ordini sono pochi e sempre uguali, un buon calendario basta.
- **Il gestionale ha già un modulo di schedulazione** che rispetta i tuoi vincoli reali: configuralo prima di costruire.
- **Non conosci i tempi reali delle lavorazioni**: senza dati affidabili dal MES o dal reparto, qualsiasi schedulatore pianifica male. Prima si misurano.

## Tempi e costi

Lavoriamo a prezzo fisso: un'**Analisi da 3.000 €**, facoltativa, per scrivere le regole di pianificazione con chi pianifica, poi lo **Sprint da 8.000 € al mese**, con il primo rilascio in produzione in **4 settimane** e la garanzia **primo mese soddisfatti o rimborsati**. Il software per la produzione può rientrare in bandi e agevolazioni: trovi quelli aperti nel nostro [elenco dei bandi](/bandi/), e come lavoriamo nella pagina [sviluppo software](/software-development/).

## Il prossimo passo

Se il tuo piano di produzione vive in un foglio che solo una persona sa aggiornare, [parliamone in 20 minuti](/parliamone/): ti mostro come si presenta uno schedulatore a capacità finita sui dati di un'officina. Se invece il problema è prevedere cosa produrre, parti da [previsione della domanda e scorte](/blog/previsione-domanda-scorte-ai/).
