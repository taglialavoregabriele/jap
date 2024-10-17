interface Card {
  id: number,
  original: string,
  translation: string
}

interface Deck {
  name: string,
  cards: Card[]
}
