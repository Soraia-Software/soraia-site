---
title: "Numeraria, agenti IA che automatizzano la gestione studio end-to-end"
client: "Numeraria"
clientLogo: "/logos/clients/numeraria.webp"
industry: "finance-vc"
sector: "Studio paghe & contabilità"
service: "Agente IA gestione preventivi e ore"
pubDate: 2026-03-15
dimensioni: "11-50"
featured: true
stakeholder:
  name: "Elisa Gnan"
  role: "Consultant"
  photo: "/testimonials/elisa-gnan-numeraria.webp"
heroQuote: "Prima metà del mese tra preventivi, ore e riconciliazioni. Oggi gli agenti IA fanno tutto in autonomia, il team usa il sistema senza nemmeno accorgersene."
shortQuote: "Preventivi, ore e riconciliazioni gestiti dagli agenti IA. Il team usa il sistema senza sforzo."
teaser:
  problem: "Tracciamento granulare di preventivi, affidamenti e ore di lavoro multi-divisione gestito manualmente, con voci specifiche (trasferte, remoto, presenza) che facevano perdere ore al mese al management."
  action: "Agenti IA integrati nella piattaforma che gestiscono il flusso end-to-end: generano preventivi su template, tracciano gli affidamenti per cliente, riconciliano le ore inserite dal team, producono reportistica per la fatturazione. Zero data entry manuale."
  resultMetric: "Metà del mese restituito al management · automazione end-to-end"
  resultBody: "Il tempo recuperato dal management va su clienti nuovi e consulenza strategica, non più a riconciliare Excel."
stats:
  - value: "Metà mese"
    label: "Tempo liberato"
    sub: "al management"
  - value: "Multi-divisione"
    label: "Voci tracciate"
    sub: "trasferte · remoto · presenza"
  - value: "End-to-end"
    label: "Preventivi → ore → fatturazione"
    sub: "automatizzato dagli agenti IA"
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

Risultato: il management dello studio (figure senior, costose) passava una **quota significativa del proprio tempo** a fare data management invece di consulenza ai clienti.

## Cosa abbiamo costruito

Soraia ha costruito una piattaforma custom con **vari agenti IA integrati nel flusso operativo** che gestiscono l'intero ciclo preventivo → affidamento → ore → fatturazione:

1. **Agente preventivi**, legge la richiesta cliente, propone le voci corrette dal catalogo Numeraria, calcola il preventivo strutturato con il livello tariffario giusto per ogni divisione. Il management approva o aggiusta, non scrive da zero.
2. **Agente affidamenti**, traccia in real-time chi è assegnato a quale cliente, su quale parte del preventivo, con visibilità del management su saturazione del team.
3. **Agente ore**, valida le ore registrate dal team con voci precise (trasferta in azienda cliente, lavoro remoto, presenza in studio, voci speciali) e le riconcilia automaticamente.
4. **Agente fatturazione**, fine mese produce il report cliente-per-cliente pronto per la fatturazione, con dettaglio voci.

Il design è pensato per **massima facilità d'uso**: i consulenti registrano ore in pochi tocchi, gli agenti fanno il lavoro pesante in background. Il management interviene solo dove serve giudizio: approvazione preventivi speciali, riassegnazioni in caso di urgenze, validazione finale del report mensile.

## I risultati

**Metà del mese restituito al management**: il tempo che prima andava in data management oggi è investito in acquisizione clienti, consulenza strategica e supervisione qualità.

**Sistema usato senza sforzo dal team**: i consulenti non vivono la piattaforma come un peso. L'automazione degli agenti rende il data entry quasi invisibile, l'inserimento ore diventa abitudine in pochi secondi.

**Multi-divisione gestita in modo unificato**: paghe, contabilità ordinaria, semplificata, consulenza, tutto nello stesso sistema con voci tariffarie corrette per ogni divisione.

**Tracking ore granulare** che prima richiedeva fogli Excel paralleli: oggi un'unica fonte di verità, in tempo reale.

## Dove stiamo andando

Sistema in produzione. Maintenance + sprint puntuali quando emergono nuove esigenze (nuove voci di servizio, integrazioni contabili specifiche, dashboard custom). Continuiamo a iterare per integrare ulteriori agenti IA che assorbano altri pezzi di operations e liberare ancora più tempo al team.
