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
  data: {
    is_common: boolean,
    jlpt: string[],
    japanese: [{
      word: string,
      reading: string
    }],
    senses: [{
      english_definitions: string[]
    }]
  }
}
