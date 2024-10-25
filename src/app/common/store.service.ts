import { Injectable } from '@angular/core';
import { Deck } from './entities';
//import Store from "secure-electron-store";

//TODO continua da qui...
//https://github.com/reZach/secure-electron-store
//o qui
//https://www.npmjs.com/package/electron-json-storage
//o qui
//https://www.reddit.com/r/electronjs/comments/10dh3lz/what_is_the_proper_way_to_permanently_store_data/
@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor() {

  }

  getDecks() {
  }

  setDecks(decks: Deck[]) {
  }

}
