export interface IdEntity {
  _id: string
}
export interface MatchPairsCard extends IdEntity {
  originalSentence: string,
  translation: string,
  isWrongOriginal?: boolean,
  isWrongTranslation?: boolean,
  clickedOriginal?: boolean,
  clickedTranslation?: boolean,
  guessed?: boolean
}

export interface MatchPairsDeck extends IdEntity {
  name: string,
  cards: MatchPairsCard[]
}

export interface WordTypeOption extends IdEntity {
  name: string,
  correct: boolean
}
export interface WordTypeCard extends IdEntity {
  name: string,
  options: WordTypeOption[]
}

export interface WordTypeDeck extends IdEntity {
  name: string,
  cards: WordTypeCard[]
}

export enum GameType {
  MATCH_PAIRS,
  WORD_TYPE,
  NOT_IMPLEMENTED
}
export interface GameSettings {
  selectedGame: GameType
  selectedDeck?: MatchPairsDeck | WordTypeDeck
}

export interface ExportJson {
  matchPairsDecks: MatchPairsDeck[],
  wordTypeDecks: WordTypeDeck[]
}

export interface KanjiInfo {
  data: [{
    is_common: boolean,
    jlpt: string[],
    japanese: Word[],
    senses: Sense[]
  }]
}

export interface Word {
  word: string,
  reading: string
}

export interface Sense {
  english_definitions: string[],
  parts_of_speech: string[]
}
