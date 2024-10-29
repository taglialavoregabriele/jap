import { Injectable } from '@angular/core';
import { MatchPairsDeck } from './entities';
import PouchDB from "pouchdb"

//TODO see if pouchDB is a viable option...
//doesn't save on disk but on app
//maybe it's ok with electron?
@Injectable({
  providedIn: 'root',
})
export class StoreService {

  decksDB: PouchDB.Database;

  constructor() {
    this.decksDB = new PouchDB("decks");
  }

  getDecks(): Promise<MatchPairsDeck[]> {
    let decks = this.decksDB.allDocs({ include_docs: true }).then(docs => {
      return docs.rows.map(d => (d.doc! as unknown) as MatchPairsDeck)
    })
    return decks;
  }

  setDecks(decks: MatchPairsDeck[]) {
    for (let i = 0; i < decks.length; i++) {
      this.decksDB.allDocs({ include_docs: true }).then(docs => {
        let existingDeck = docs.rows.find((row) => row.doc!._id == decks[i]._id)
        if (existingDeck) {
          //update existing ones
          this.decksDB.get(existingDeck.id).then(doc => {
            let app = decks[i] as any
            app._rev = doc._rev
            app._id = doc._id
            this.decksDB.put(app)
          })
        } else {
          //save new ones
          this.decksDB.put(decks[i])
        }
      })
    }
    //TODO do it properly
    this.decksDB.allDocs({ include_docs: true }).then(docs => {
      docs.rows.forEach(i => {
        if (!decks.find(j => j._id == i.doc?._id)) this.decksDB.remove(i.doc!)
      })
    })
  }

}
