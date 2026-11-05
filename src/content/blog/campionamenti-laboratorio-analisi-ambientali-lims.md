---
title: "Campionamenti in laboratorio: dal telefono al LIMS"
description: "Campionamenti di laboratorio registrati dal telefono con foto, GPS e calcoli, e lo stesso dato nel LIMS e nel rapporto di prova, senza ricopiature."
pubDate: 2026-11-30
author: "Daniel Levis"
tags:
  - "laboratori"
  - "tecnici in campo"
  - "software su misura"
  - "how-to"
keywords:
  - "campionamenti laboratorio LIMS"
  - "app campionamento analisi ambientali"
  - "verbale di campionamento digitale"
  - "laboratorio ISO 17025 campionamento"
readMinutes: 6
featured: false
h1: "Campionamenti di laboratorio e LIMS: il dato si scrive una volta sola"
faq:
  - q: "Bisogna sostituire il LIMS?"
    a: "No. La piattaforma prende dal LIMS gli incarichi da pianificare e gli restituisce i dati di campo, che arrivano così alla pre-accettazione e al rapporto di prova. Il LIMS resta il sistema di riferimento del laboratorio."
  - q: "Cosa registra il tecnico dal telefono?"
    a: "Il prelievo con i suoi valori, le foto, la posizione GPS e i calcoli fatti sul posto, come le portate dei fumi. La piattaforma può rendere obbligatori i campi che la norma chiede di registrare, così il prelievo non si chiude incompleto."
  - q: "Come si gestisce la validazione?"
    a: "Il validatore firma nella piattaforma e il registro delle misure resta collegato al dato. È la stessa informazione che poi alimenta il rapporto finale, senza passaggi di mano."
  - q: "Dove entra l’intelligenza artificiale?"
    a: "In questo progetto non è centrale. Il valore sta nel dato registrato una volta sola, dove viene misurato; l’IA può servire dopo, per esempio a leggere documenti in arrivo, ma non è la base del sistema."
  - q: "Quanto tempo serve per partire?"
    a: "Il primo rilascio va in produzione in <strong>4 settimane</strong>. Prima si mappa il flusso reale, dal prelievo al rapporto, e si decide quali calcoli e quali registrazioni portare subito sul telefono."
lang: "it"
draft: true
---

In molti laboratori di analisi ambientali il tecnico compila il foglio di campo a mano, sul tetto di uno stabilimento o accanto a un camino, e in ufficio qualcuno ricopia tutto nel LIMS. Il rischio di errore sta proprio sul dato che finirà nel rapporto di prova, quello che il laboratorio firma.

Registrare i campionamenti del laboratorio direttamente dal telefono, e portare quel dato nel LIMS senza ricopiature, è più semplice di quanto sembri. Il valore non sta nella tecnologia ma in una regola: il dato si scrive una volta sola, dove viene misurato.

**In breve:**
- Nei laboratori di analisi ambientali il dato di campo, su emissioni, rifiuti, acque e aria, nasce spesso su carta e viene ricopiato nel LIMS: è lì che si annidano gli errori.
- Una piattaforma di campo registra il prelievo dal telefono con foto e GPS, fa i calcoli in diretta e passa lo stesso dato a pre-accettazione e rapporto di prova.
- Per la norma ISO/IEC 17025 il campionamento seguito da una prova è un'attività del laboratorio, e le sue registrazioni devono essere complete.
- L'intelligenza artificiale qui non è il centro: conta il dato registrato una volta sola, nel punto in cui viene misurato.
- Il LIMS non si sostituisce: la piattaforma prende da lì gli incarichi e gli restituisce i dati.

## Dove si perde il dato, tra il camino e il rapporto di prova?

Prendiamo le emissioni in atmosfera, regolate dalla Parte Quinta del [D.Lgs. 152/2006](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2006-04-03;152). Il percorso di un campionamento passa per molte mani:

1. l'ufficio pianifica l'incarico, i mezzi e i dispositivi di protezione;
2. il tecnico esegue il prelievo e annota valori, condizioni e orari sul foglio di campo;
3. in laboratorio qualcuno ricopia il foglio per la pre-accettazione dei campioni;
4. dati di campo e risultati delle analisi si incontrano nel LIMS;
5. il rapporto di prova viene compilato, validato e firmato.

Ogni ricopiatura è un'occasione di errore: un valore trascritto male, un orario mancante, una firma dimenticata. E i calcoli di campo, come le portate dei fumi, rifatti in ufficio a mano o su un foglio di calcolo, raddoppiano il lavoro.

## Cosa fa la piattaforma di campo

Per un laboratorio di analisi ambientali accreditato, che lavora su emissioni dei camini, rifiuti, acque e aria, stiamo realizzando una piattaforma che segue l'intervento dalla pianificazione al rapporto firmato:

- **pianificazione** di incarichi, mezzi e dispositivi di protezione a partire dai dati già presenti nel LIMS;
- **prelievo registrato dal telefono**, con foto e posizione GPS;
- **calcoli in diretta** sul posto: portate dei fumi, gravimetrico, COT, solventi;
- **firma del validatore** e registro delle misure;
- **un solo dato** che alimenta sia la pre-accettazione sia il rapporto finale.

Il tecnico non compila più un foglio da ricopiare: inserisce il dato che arriverà, identico, nel rapporto.

## Cosa chiede l'accreditamento sul campionamento?

In Italia l'accreditamento dei laboratori di prova lo rilascia [Accredia](https://www.accredia.it/accreditamento/come-accreditarsi/), l'ente unico nazionale, secondo la norma [ISO/IEC 17025](https://www.iso.org/standard/66912.html). Per la norma il campionamento seguito da una prova fa parte delle attività del laboratorio: non viene prima del laboratorio, è già laboratorio.

La norma chiede registrazioni complete del prelievo: il metodo usato, data e ora, l'identificazione del campione, chi ha campionato, le attrezzature, le condizioni ambientali o di trasporto quando contano, la posizione del punto di prelievo ed eventuali deviazioni dal piano. Le prescrizioni di Accredia per i laboratori di prova sono nel documento [RT-08](https://accredia.it/wp-content/uploads/2021/12/RT-08-rev.05-_EC-10-02-2022.pdf).

Un foglio di carta può contenere tutto questo, ma solo se nessuno dimentica niente. Una piattaforma può renderlo obbligatorio: non chiude il prelievo senza ora, firma e posizione, e allega foto e coordinate come prova.

## Perché non basta un modulo generico sul tablet?

Un modulo compilabile elimina la carta, non le ricopiature. In un laboratorio fanno la differenza tre cose:

- i **calcoli specifici** del campionamento fatti sul posto, non rifatti in ufficio;
- il **collegamento con il LIMS**, in entrata per gli incarichi e in uscita per i dati;
- la **validazione** con firma e registro delle misure, dentro lo stesso flusso.

Senza questi tre pezzi si digitalizza il foglio, ma il lavoro in ufficio resta uguale. Ne abbiamo scritto anche in [come portare i processi aziendali oltre Excel](/blog/smettere-di-gestire-i-processi-su-excel/).

## Quando non conviene

- **Pochi campionamenti al mese**: il risparmio sulle ricopiature non ripaga lo sviluppo.
- **Il fornitore del LIMS ha già un modulo di campo** che copre i tuoi calcoli: usalo, e investi su altro.
- **Il LIMS non permette di importare ed esportare dati**: senza un modo di scambiarli, il collegamento diventa fragile e il valore cala.

## Tempi e costi

Lavoriamo a prezzo fisso: un'**Analisi da 3.000 €**, facoltativa, per mappare il flusso dal prelievo al rapporto, poi lo **Sprint da 8.000 € al mese**, con il primo rilascio in produzione in **4 settimane** e la garanzia **primo mese soddisfatti o rimborsati**.

Una piattaforma come questa può rientrare nei voucher per la digitalizzazione: trovi quelli aperti nel nostro [elenco dei bandi](/bandi/).

## Il prossimo passo

Se nel tuo laboratorio il foglio di campo viene ancora ricopiato, [parliamone in 20 minuti](/parliamone/): ti mostro come si presenta il flusso dal telefono al rapporto. Per altri processi su misura, trovi come lavoriamo nella pagina [sviluppo software](/software-development/).
