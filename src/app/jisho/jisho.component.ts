import { Component } from '@angular/core';
import { JishoService } from '../common/jisho.service';
import { KanjiInfo, Sense, Word } from '../common/entities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-jisho',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './jisho.component.html',
  styleUrl: './jisho.component.scss'
})
export class JishoComponent {

  constructor(private jishoService: JishoService) { }

  searchTerm: string = '';
  wordData: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  searchHistory: string[] = [];
  senses: Sense[] = [];
  words?: Word[];


  searchWord() {
    if (!this.searchTerm.trim()) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.wordData = null;

    this.jishoService.getKanjiInfo(this.searchTerm).subscribe(res => {
      this.wordData = res.data;
      this.senses = res.data[0].senses;
      this.words = res.data[0].japanese;
      this.addToHistory(this.searchTerm);
      this.isLoading = false;
    }, (error) => {
      this.errorMessage = 'Word not found. Please try another search.';
      this.isLoading = false;
    });
  }

  addToHistory(term: string) {
    if (!this.searchHistory.includes(term.toLowerCase())) {
      this.searchHistory.unshift(term);
      if (this.searchHistory.length > 5) {
        this.searchHistory.pop();
      }
    }
  }

  searchFromHistory(term: string) {
    this.searchTerm = term;
    this.searchWord();
  }
}
