import { Injectable } from '@angular/core';
import { Deck } from './entities';
import * as PouchDB from "pouchdb"
//import Store from "secure-electron-store";

//TODO keep up with pouchDB
@Injectable({
  providedIn: 'root',
})
export class StoreService {

  decksDB: PouchDB.Database;

  constructor() {
    this.decksDB = new PouchDB.default("decks");
  }

  getDecks() {
    return this.decksDB.get("decks")
  }

  setDecks(decks: Deck[]) {

  }

}
