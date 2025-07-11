import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-element',
  imports: [],
  template: `
    @if(writing) {
      <ng-content></ng-content>
    }@else {
      <button class="card add" (click)="$event.preventDefault(); writing = true;">
          <h2 class="text-large">{{label}}</h2>
          <img width="30" height="30" src="https://img.icons8.com/fluency/48/plus.png" alt="Agregar"/>
      </button>
    }
  `,
  styles: `
    .add {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 95%;
      padding: 1rem;
      border: none;
    }
    .text-large {
      margin: 0;
    }
  `
})
export class AddElementComponent {
  @Input({ required: true }) label: string = '';
  writing = false;
}
