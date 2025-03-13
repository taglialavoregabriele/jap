import { Component } from '@angular/core';
import { JishoService } from '../common/jisho.service';
import { KanjiInfo } from '../common/entities';
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
  word: string

  constructor(private jishoService: JishoService) { }

  searchOnJisho() {
    this.jishoService.getKanjiInfo(this.word).subscribe(res => console.log(res as KanjiInfo))
  }
}
