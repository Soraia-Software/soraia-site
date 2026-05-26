---
title: "Numeraria, €32.000/mese risparmiati con agente IA gestione studio"
client: "Numeraria"
clientLogo: "/logos/clients/numeraria.webp"
industry: "finance-vc"
sector: "Studio paghe & contabilità"
service: "Agente IA gestione preventivi e ore"
pubDate: 2026-03-15
featured: true
stakeholder:
  name: "Delia Frigatti"
  role: "Manager"
  photo: ""
heroQuote: "Prima passavamo metà del mese a fare preventivi, registrare ore di lavoro, riconciliare affidamenti tra le divisioni. Oggi l'agente IA fa tutto in autonomia, e il numero che ci ha portato è €32.000 al mese di costo operativo evitato."
teaser:
  problem: "Tracciamento granulare di preventivi, affidamenti e ore di lavoro multi-divisione gestito manualmente, con voci specifiche (trasferte, remoto, presenza) che facevano perdere ore al mese al management."
  action: "Agente IA che gestisce il flusso end-to-end: genera preventivi su template, traccia gli affidamenti per cliente, riconcilia le ore inserite dal team, produce reportistica per la fatturazione."
  resultMetric: "€32.000/mese di costo operativo risparmiato"
  resultBody: "Il management dello studio dedica oggi quel tempo a clienti nuovi e consulenza strategica, non a riconciliare fogli Excel."
stats:
  - value: "€32k"
    label: "Risparmiati/mese"
    sub: "costo operativo"
  - value: "Multi-divisione"
    label: "Voci tracciate"
    sub: "trasferte · remoto · presenza"
  - value: "End-to-end"
    label: "Preventivi → ore → fatturazione"
    sub: "in un unico sistema"
timeline: "Sprint dev iniziale, oggi sistema in produzione + maintenance"
stack:
  - "Xano (backend)"
  - "WeWeb (frontend management)"
  - "OpenAI (generazione preventivi)"
  - "Export contabilità su sistemi esistenti"
related:
  - "cxl"
  - "liftt"
  - "stars-be-original"
---

## Il contesto

Numeraria è uno studio paghe e contabilità italiano multi-divisione. Il modello business è tipico del settore: piccolo team interno che gestisce un portafoglio di clienti aziendali, fatturando in modo granulare il tempo speso su ogni pratica (cedolini, dichiarazioni, consulenza fiscale, controlli, trasferte).

Il valore di Numeraria dipende dalla **precisione con cui traccia il tempo speso per cliente** e dalla velocità nel produrre preventivi accurati per nuove richieste.

## Il problema reale

Il flusso operativo viveva su un patchwork di Excel + tool legacy:

- **Preventivi** preparati manualmente per ogni richiesta cliente, con voci diverse per ciascuna divisione (cedolini paghe, contabilità ordinaria, contabilità semplificata, consulenza fiscale, etc.).
- **Affidamenti** tracciati a mano in fogli condivisi: chi è stato assegnato a quale cliente, per quante ore previste, su quale livello tariffario.
- **Ore di lavoro** del team registrate in più posti con voci frammentate (trasferte vs remoto vs presenza in studio, lavoro su pratica specifica vs general overhead).
- **Riconciliazione mensile** tra ore registrate, affidamenti previsti e fatturazione cliente: ore di lavoro umano del management ogni inizio mese.

Risultato: il management dello studio (figure senior, costose) passava una **quota significativa del proprio tempo** a fare data management invece di consulenza ai clienti. Tradotto in costo operativo: decine di migliaia di euro al mese in tempo qualificato bruciato in operations.

## Cosa ha fatto l'agente IA

Soraia ha costruito una piattaforma custom con un agente IA che gestisce **l'intero ciclo preventivo → affidamento → ore → fatturazione**:

1. **Generazione preventivi automatica**, l'agente legge la richiesta cliente, propone le voci corrette dal catalogo Numeraria, calcola il preventivo strutturato con il livello tariffario giusto per ogni divisione. Il management approva o aggiusta, non scrive da zero.
2. **Tracciamento affidamenti in real-time**, chi è assegnato a quale cliente, su quale parte del preventivo, con visibilità del management su saturazione del team.
3. **Registrazione ore granulare**, il team registra le ore con voci precise (trasferta in azienda cliente, lavoro remoto, presenza in studio, voci speciali). L'agente valida e riconcilia.
4. **Export per fatturazione**, fine mese, l'agente produce il report cliente-per-cliente per la fatturazione, con dettaglio voci.

Il management interviene solo dove serve giudizio: approvazione preventivi speciali, riassegnazioni in caso di urgenze, validazione finale del report mensile.

## I risultati

**€32.000/mese di costo operativo risparmiato** dall'introduzione dell'agente IA. Numero pubblico citato dal cliente.

Il risparmio non è in licenze software o costi diretti: è il **tempo del management e dei senior** liberato da operations ripetitive e re-investito in lavoro a valore aggiunto (acquisizione clienti, consulenza strategica, supervisione qualità).

**Multi-divisione gestita in modo unificato**: paghe, contabilità ordinaria, semplificata, consulenza, tutto nello stesso sistema, con voci tariffarie corrette per ogni divisione.

**Tracking ore granulare** che prima richiedeva fogli Excel paralleli: oggi un'unica fonte di verità, in tempo reale.

## Cosa è incluso oggi

Sistema in produzione, status ACTIVE. Maintenance + sprint puntuali quando emergono nuove esigenze (nuove voci di servizio, integrazioni contabili specifiche, dashboard custom per nuovi tipi di reporting).

Numeraria è uno dei case studies più puliti del portfolio Soraia in termini di ROI quantificabile: €32k/mese × 12 mesi = ~€384k/anno di costo operativo evitato, su un investimento sprint che ha pagato per intero il proprio costo in meno di un trimestre.
