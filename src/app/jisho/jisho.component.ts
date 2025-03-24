import { Component } from '@angular/core';
import { JishoService } from '../common/jisho.service';
import { KanjiInfo, Sense, Word } from '../common/entities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

//this.jishoService.getKanjiInfo(this.searchTerm).subscribe

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
  kanjiData: KanjiInfo | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  searchHistory: string[] = [];

  searchKanji() {
    if (!this.searchTerm.trim()) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.kanjiData = null;

    this.jishoService.getKanjiInfo(this.searchTerm).subscribe(
      (data) => {
        this.kanjiData = data;
        this.addToHistory(this.searchTerm);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Kanji/word not found. Please try another search.';
        this.isLoading = false;
      }
    );
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
    this.searchKanji();
  }

  getJlptLevels(jlpt: string[]): string {
    if (!jlpt?.length) return 'Not in JLPT';
    return jlpt.join(', ');
  }

  trackByIndex(index: number): number {
    return index;
  }
}
