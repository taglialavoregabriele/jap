/*
import { KanjiInfo } from './entities';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class JishoService {

  JISHO_URL = "https://jisho.org/api/v1"

  constructor(protected http: HttpClient) {
  }

  public getKanjiInfo(kanji: string): Observable<KanjiInfo> {
    return this.http.get(this.JISHO_URL + "/search/words?" + kanji) as Observable<KanjiInfo>
  }

}
*/
