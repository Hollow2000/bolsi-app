import { Component, ElementRef, HostListener, Input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-element',
  imports: [MatIcon],
  template: `
    @if(writing) {
      <ng-content></ng-content>
    }@else {
      <button class="card add" (click)="$event.preventDefault(); open()">
          <h2 class="text-large">{{label}}</h2>
          <mat-icon fontSet="material-symbols-rounded" class="add-icon">add_circle</mat-icon>
      </button>
    }
  `,
  styles: `
    .add {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 1rem;
      border: none;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .text-large {
      margin: 0;
    }
    .add-icon {
      width: 30px;
      height: 30px;
      font-size: 32px;
      color: var(--primary-color);
    }
  `
})
export class AddElementComponent {
  @Input({ required: true }) label: string = '';
  onClose = output();
  writing = false;

  constructor(private readonly elRef: ElementRef) {

  }

  open() {
    this.writing = true;
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.elRef.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      });
    }, 100);

  }

  @HostListener('window:touchstart', ['$event'])
  @HostListener('window:mousedown', ['$event'])
  outInteraction($event: Event) {
    if (this.writing && !this.elRef.nativeElement.contains($event.target)) {
      this.writing = false;
      this.onClose.emit();
    }
  }
}
