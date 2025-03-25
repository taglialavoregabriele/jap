import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../common/store.service';
import { MatchPairsDeck, MatchPairsCard, GameType } from '../../common/entities';
import { shuffle } from '../../common/utils';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

interface Connection {
  start: { x: number; y: number };
  end: { x: number; y: number };
  correct: boolean;
}

@Component({
  selector: 'match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrls: ['./match-pairs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  animations: [
    trigger('wrongChoice', [
      transition('normal => wrong', [
        animate('0.5s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.1 }),
          style({ transform: 'translateX(10px)', offset: 0.2 }),
          style({ transform: 'translateX(-10px)', offset: 0.3 }),
          style({ transform: 'translateX(10px)', offset: 0.4 }),
          style({ transform: 'translateX(0)', offset: 0.5 })
        ]))
      ])
    ])
  ]
})
export class MatchPairsGameComponent implements OnInit, AfterViewInit {
  @ViewChildren('originalCard') originalCards: QueryList<ElementRef>;
  @ViewChildren('translationCard') translationCards: QueryList<ElementRef>;
  @ViewChild('connectionsSvg') connectionsSvg: ElementRef;

  decks: MatchPairsDeck[];
  selectedDeck: MatchPairsDeck;
  clickedCard: MatchPairsCard;
  shuffledCards: MatchPairsCard[];
  gameWon: boolean;
  connections: Connection[] = [];
  form: FormGroup;
  isWrongChoice = false;

  constructor(protected storeService: StoreService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.storeService.getMatchPairsDecks().then(decks => {
      this.decks = decks
    })

    this.form = this.formBuilder.group({
      selectedDeck: this.selectedDeck
    })
  }

  ngAfterViewInit() {
    // Setup observers for card position changes
    this.setupCardObservers();
  }

  private setupCardObservers() {
    const observer = new MutationObserver(() => {
      this.updateConnections();
    });

    const config = { attributes: true, childList: true, subtree: true };

    // Observe each original and translation card
    this.originalCards.forEach(card => observer.observe(card.nativeElement, config));
    this.translationCards.forEach(card => observer.observe(card.nativeElement, config));
  }

  private updateConnections() {
    this.connections = [];

    if (!this.selectedDeck) return;

    // Generate connections for guessed pairs
    this.selectedDeck.cards.forEach((card, index) => {
      if (card.guessed) {
        const originalCard = this.originalCards.get(index)?.nativeElement;
        const translationCard = this.translationCards.toArray()
          .find(el => el.nativeElement.textContent.trim() === card.translation)?.nativeElement;

        if (originalCard && translationCard) {
          const connection = this.calculateConnection(originalCard, translationCard);
          this.connections.push({
            ...connection,
            correct: true
          });
        }
      }
    });
  }

  private calculateConnection(start: HTMLElement, end: HTMLElement): Connection {
    const startRect = start.getBoundingClientRect();
    const endRect = end.getBoundingClientRect();
    const svgRect = this.connectionsSvg.nativeElement.getBoundingClientRect();

    // Calculate line coordinates for the connection
    return {
      start: {
        x: startRect.right - svgRect.left,
        y: startRect.top - svgRect.top + startRect.height / 2
      },
      end: {
        x: endRect.left - svgRect.left,
        y: endRect.top - svgRect.top + endRect.height / 2
      },
      correct: true
    };
  }
  clickCard(card: MatchPairsCard, isOriginalSentence: boolean) {
    //TODO check conditions, bug if you click more than once on same button type
    if (!this.clickedCard || this.clickedCard.clickedOriginal && isOriginalSentence || this.clickedCard.clickedTranslation && !isOriginalSentence) {
      if (this.clickedCard) {
        this.clickedCard.clickedOriginal = false
        this.clickedCard.clickedTranslation = false
      }
      this.clickedCard = card;
      //TODO make less accroccato
      this.clickedCard.clickedOriginal = isOriginalSentence
      this.clickedCard.clickedTranslation = !this.clickedCard.clickedOriginal
    } else {
      if (this.clickedCard._id == card._id) {
        this.clickedCard.guessed = true;
        this.clickedCard.clickedOriginal = false
        this.clickedCard.clickedTranslation = false
        this.clickedCard = null

        this.updateConnections();
      } else {
        card.isWrongOriginal = isOriginalSentence;
        this.clickedCard.isWrongOriginal = !isOriginalSentence;
        card.isWrongTranslation = !isOriginalSentence;
        this.clickedCard.isWrongTranslation = isOriginalSentence;


        setTimeout(() => {
          card.isWrongOriginal = false
          this.clickedCard.isWrongOriginal = false
          card.isWrongTranslation = false
          this.clickedCard.isWrongTranslation = false
        }, 500);
      }
    }
    this.gameWon = this.selectedDeck!.cards.findIndex(c => !c.guessed) == -1
    console.log(this.gameWon)
  }

  submit(form) {
    this.resetDeck();
    this.selectedDeck = form.value.selectedDeck
    this.shuffledCards = this.shuffleDeck(this.selectedDeck.cards.slice());
  }

  resetGame() {
    this.resetDeck()
    this.selectedDeck = null;
    this.gameWon = false;
    this.connections = [];
    this.form.reset();
  }

  shuffleDeck(cards: MatchPairsCard[]): MatchPairsCard[] {
    return shuffle(cards);
  }

  private resetDeck() {
    if (this.selectedDeck) this.selectedDeck.cards.forEach(c => c.guessed = false)
  }

  get GameType(): typeof GameType {
    return GameType
  }
}
