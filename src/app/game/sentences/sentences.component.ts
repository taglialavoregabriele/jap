import { Component, ElementRef, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sentences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sentences.component.html',
  styleUrl: './sentences.component.scss',
  animations: [
    trigger('snap', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class SentencesComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  // Sentence blocks (some are empty)
  sentenceBlocks = [
    { text: 'I' },
    { text: '' }, // Empty block
    { text: 'to' },
    { text: '' }, // Empty block
    { text: 'the' },
    { text: '' }, // Empty block
  ];

  // Options for filling empty blocks
  options = [
    { text: 'go' },
    { text: 'store' },
    { text: 'park' },
  ];

  // Track the selected option
  selectedOption: { text: string; index: number } | null = null;

  // Track the moving block
  movingBlock: {
    text: string;
    startTop: number;
    startLeft: number;
    targetTop: number;
    targetLeft: number;
  } | null = null;

  // Select an option from the list
  selectOption(option: { text: string }, index: number) {
    this.selectedOption = { ...option, index };
  }

  // Fill the first empty slot in the sentence
  fillEmptySlot(index: number) {
    if (this.selectedOption && !this.sentenceBlocks[index].text) {
      // Get the starting position of the selected option
      const startPosition = this.getBlockPosition('selection-area', this.selectedOption.index);

      // Get the target position of the empty slot
      const targetPosition = this.getBlockPosition('sentence-area', index);

      // Hide the original block
      const originalBlock = this.el.nativeElement.querySelector(`.selection-area .option-block:nth-child(${this.selectedOption.index + 1})`);
      this.renderer.addClass(originalBlock, 'hidden');

      // Start the moving animation
      this.movingBlock = {
        text: this.selectedOption.text,
        startTop: startPosition.top,
        startLeft: startPosition.left,
        targetTop: targetPosition.top,
        targetLeft: targetPosition.left,
      };

      // Wait for the animation to complete, then update the sentence
      setTimeout(() => {
        this.sentenceBlocks[index].text = this.selectedOption!.text;
        this.selectedOption = null;
        this.movingBlock = null;

        // Show the original block again
        //this.renderer.removeClass(originalBlock, 'hidden');
      }, 150); // Match the duration of the animation
    }
  }

  // Get the position of a block
  getBlockPosition(areaClass: string, index: number): { top: number; left: number } {
    const area = document.querySelector(`.${areaClass}`) as HTMLElement;
    const block = area.children[index] as HTMLElement;
    const rect = block.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
    };
  }
}
