interface Card {
  id: number,
  original: string,
  translation: string,
  wrongOptions?: string[]
}

interface Deck {
  name: string,
  cards: Card[]
}
