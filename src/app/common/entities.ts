interface Card {
  id: number,
  originalSentence: string,
}

interface CardMatchPair extends Card {
  translation: string
}

interface CardMissingWord extends Card {
  missingPositions: number[]
}

interface Deck {
  name: string,
  cards: Card[]
}
