
SHUFFLE E DISPOSIZIONE CARTE
> Preparo ambiente React svuotato e con Tailwind installato
> sistemo il CSS di App.js in modo da mettere uno sfondo e centrare tutti gli elementi
> Creo un file cardImages che importa le immagini delle carte e crea l'array che le contiene
> Creo i due componenti principali: CardConatiner che conterrà la logica e Card che conterrà ovviamente ogni singola carta e i suoi dati
> Creo il CSS delle card, utilizzando un border provvisorio
> Sistemo il CSS di CardContainer per visualizzare le card disposte e avere una panoramica estetica (per adesso non le itero ma le scrivo in elenco in modo da averle disponibili)

> Una volta sistemato il layout, inizio a creare la logica in CardContainer: creo l'array di 12 carte e lo mescolo
    > In questo modo avrò lo stato del componente con le carte mescolate 'shuffledCards'
    > Posso quindi iterare ogni singola Card, eliminando i componenti inseriti ad elenco, e ad ognuno passo index e front

> Successivamente torno in Card e ricevendo il valore di front, lo utilizzo per selezionare image (che sarà uno stato del componente)  dall'array di cardImages all'indice indicato in front
    > In questo modo potrò visualizzare le Card disposte sul piano a random ad ogni refreh della pagina
---

INIZIO A GESTIRE IL CLICK SULLA CARD
> Come prima cosa 

