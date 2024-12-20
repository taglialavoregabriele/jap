
import { MatchPairsDeck, WordTypeDeck, MatchPairsCard, ExportJson, KanjiInfo } from './../common/entities';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SafeUrl } from '@angular/platform-browser';
import { StoreService } from '../common/store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JishoService } from '../common/jisho.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    FormsModule
  ]
})
export class SettingsComponent implements OnInit {

  constructor(private storeService: StoreService, private jishoService: JishoService) { }

  downloadJsonHref: SafeUrl
  wordTypeDecks: WordTypeDeck[]
  matchPairsDecks: MatchPairsDeck[]
  word: string


  ngOnInit(): void {
    this.storeService.getMatchPairsDecks().then(decks => {
      this.matchPairsDecks = decks
    })
    this.storeService.getWordTypeDecks().then(decks => {
      this.wordTypeDecks = decks
    })
  }


  import(event) {
    let file = event.target.files[0]
    console.log(file)
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let res = JSON.parse(reader.result + "") as ExportJson
      console.log(res.wordTypeDecks)
      console.log(res.matchPairsDecks)
      this.storeService.setWordTypeDeck(res.wordTypeDecks)
      this.storeService.setMatchPairsDeck(res.matchPairsDecks)
    }, false)
    reader.readAsText(file)
  }

  export() {
    var wordTypeJSON = JSON.stringify(this.wordTypeDecks);
    var matchPairsDecksJSON = JSON.stringify(this.matchPairsDecks);
    let theJSON = '{"wordTypeDecks": ' + wordTypeJSON + "," + '"matchPairsDecks": ' + matchPairsDecksJSON + "}"
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    element.setAttribute('download', "export.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  searchOnJisho(){
    this.jishoService.getKanjiInfo(this.word).subscribe(res => console.log(res as KanjiInfo))
  }
}
