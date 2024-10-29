export interface IdEntity {
  _id: string
}
export interface MatchPairsCard extends IdEntity {
  originalSentence: string,
  translation: string,
  //TODO make less accroccato
  clickedOriginal?: boolean,
  clickedTranslation?: boolean,
  guessed?: boolean
}

export interface MatchPairsDeck extends IdEntity {
  name: string,
  cards: MatchPairsCard[]
}

export interface WordType extends IdEntity {
  type: string,
}
export interface WordTypeCard extends IdEntity {
  word: string,
  wordType: WordType
}

export interface WordTypeDeck extends IdEntity {
  name: string,
  wordTypes: WordType[]
  cards: WordTypeCard[]
}

export enum GameType {
  MATCH_PAIRS,
  WORD_TYPE,
  NOT_IMPLEMENTED
}
export interface GameSettings {
  selectedGame: GameType
  selectedDeck?: MatchPairsDeck
}

