export interface Card {
  id: number,
  originalSentence: string,
  translation: string
}

export interface Deck {
  id: number,
  name: string,
  cards: Card[]
}
