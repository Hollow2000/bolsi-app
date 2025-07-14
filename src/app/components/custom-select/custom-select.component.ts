import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  imports: [ReactiveFormsModule],
  template: `
    <select class="text-medium custom-select" name="frecuency" id="frecuency" required [formControl]="formControlApp" >
      <option value="" disabled selected hidden>{{placeHolder}}</option>
      @for (option of options; track $index) {
      <option [value]="option">{{option}}</option>
      }
    </select>
    <div class="arrow-icon"></div>
  `,
  styles: `
    :host {
      position: relative;
    }

    .custom-select {
      padding: 0.8rem;
      border: none;
      border-radius: 20px;
      width: -webkit-fill-available;
      width: fill-available;
      padding-right: 30px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      box-sizing: border-box;

      option {
        color: var(--text-color);
      }
    }

    .custom-select:invalid {
      color: #757575; /* gris placeholder */
    }

    /* Flecha con background en base64 */
    :host .arrow-icon {
      position: absolute;
      top: 50%;
      right: 10px; /* ajústalo para mover la flecha más a la izquierda */
      transform: translateY(-50%);
      pointer-events: none;
      width: 14px;
      height: 14px;
      background-size: cover;
      background-repeat: no-repeat;
    }

    @media (prefers-color-scheme: light) {
      :host .arrow-icon {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8UlEQVR4nO3T20rDQBSF4e8JFKRordYTiqL4YL6l3gnijVZbT6ioeHiJSGAqY5jERlO8yYINgb3W+hMyQ6tW/6kZHKDTQFcndOWd3zSLY2QYovcHyALOQ9cp5uLlUViMZ/RLWC9k467D2HBRWOZzg34NSD9kij2DSUwP2JgAsoLbkvx60bxcAnvEZgVkFXeJ3D3WykJdXCZCr9hN+LfwlPBfhxevVLfkn71hL/Jt47kEsqTGEU3B3rGPHbwk9ld1IFVHNZ+PMFlDV+LrywaJ0qxJyFjz0U2fGuQn2AiLGlYOO4sgw2lAYthJmPy5VSu19QnKJIAirbc/YwAAAABJRU5ErkJggg==");
      }
    }
    @media (prefers-color-scheme: dark) {
      :host .arrow-icon {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8klEQVR4nO3T20rDQBRG4TxBBSm1VusJRVF8MN9S7wTxplZbT6ioeHiJT4pzMcaJiZoiSBbM1d7/XpPJTJY1NPwZaGEP7RpmtcOsVr4wg0PvjND7hWQOJ2HWMWbj4oGPjH8iQy9kY/bjhlOfuUT/G5J+yOQZVmm6xVoFyRKuCvKr+ebFAtkd1r+QLOM6kbvBSlGoi7NE6Anbif4N3Cf6LyYbLzuGbsE/e8ZO1LeJhwLJQtlxx1c0JXvBLrbwmKifV5aUXNUJr2Gp40nEXzZMDK1PEsk60UufjqSCbIz5rE6CbBBJRrVLcrKjsDpTkTT8f94AOe2OMEdTyy0AAAAASUVORK5CYII=");
      }
    }
  `
})
export class CustomSelectComponent {
  @Input({required: true}) options: string[] = [];
  @Input({required: true}) placeHolder: string = "Selecciona una opcion";
  @Input() formControlApp: FormControl = new FormControl("",[Validators.required]);
}
