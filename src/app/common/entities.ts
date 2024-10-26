export interface Card {
  _id: string,
  originalSentence: string,
  translation: string
}

export interface Deck {
  _id: string,
  name: string,
  cards: Card[]
}
