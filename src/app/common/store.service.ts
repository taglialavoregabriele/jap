import { Injectable } from '@angular/core';
import { GameType, MatchPairsDeck, WordTypeDeck } from './entities';
import PouchDB from "pouchdb"

//TODO see if pouchDB is a viable option...
//doesn't save on disk but on app
//maybe it's ok with electron?
@Injectable({
  providedIn: 'root',
})
export class StoreService {

  matchPairsDB: PouchDB.Database;
  wordTypeDB: PouchDB.Database;

  constructor() {
    this.matchPairsDB = new PouchDB("matchPairs");
    this.wordTypeDB = new PouchDB("wordType")
  }

  getMatchPairsDecks(): Promise<MatchPairsDeck[]> {
    return this.matchPairsDB.allDocs({ include_docs: true }).then(docs => {
      return docs.rows.map(d => {
        d.doc._rev = undefined
        return (d.doc! as unknown) as MatchPairsDeck
      })
    })
  }

  setMatchPairsDeck(decks: MatchPairsDeck[]) {
    this.setDecks(decks, GameType.MATCH_PAIRS)
  }

  getWordTypeDecks(): Promise<WordTypeDeck[]> {
    return this.wordTypeDB.allDocs({ include_docs: true }).then(docs => {
      return docs.rows.map(d => {
        d.doc._rev = undefined
        return (d.doc! as unknown) as WordTypeDeck
      })
    })
  }

  setWordTypeDeck(decks: WordTypeDeck[]) {
    this.setDecks(decks, GameType.WORD_TYPE)
  }

  private setDecks(decks: MatchPairsDeck[] | WordTypeDeck[], gameType: GameType) {
    let db = null

    if (gameType == GameType.MATCH_PAIRS) db = this.matchPairsDB
    else if (gameType == GameType.WORD_TYPE) db = this.wordTypeDB
    else return;

    for (let i = 0; i < decks.length; i++) {
      db.allDocs({ include_docs: true }).then(docs => {
        let existingDeck = docs.rows.find((row) => row.doc!._id == decks[i]._id)
        if (existingDeck) {
          //update existing ones
          db.get(existingDeck.id).then(doc => {
            let app = decks[i] as any
            app._rev = doc._rev
            app._id = doc._id
            db.put(app)
          })
        } else {
          //save new ones
          db.put(decks[i])
        }
      })
    }
    //TODO do it properly
    db.allDocs({ include_docs: true }).then(docs => {
      docs.rows.forEach(i => {
        if (!decks.find(j => j._id == i.doc?._id)) db.remove(i.doc!)
      })
    })
  }

}
