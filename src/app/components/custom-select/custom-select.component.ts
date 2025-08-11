import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectOption } from '../../core/interfaces/selectOption.interface';

@Component({
  selector: 'app-custom-select',
  imports: [ReactiveFormsModule],
  template: `
    <select class="text-medium custom-select" name="frecuency" id="frecuency" required [formControl]="formControlApp" >
      <option value="" disabled selected hidden>{{placeHolder}}</option>
      @for (option of options; track option.key) {
      <option [value]="option.key">{{option.text}}</option>
      }
    </select>
    <div class="arrow-icon" [class.arrow-icon-invalid]="isInvalid"></div>
  `,
  styles: `
    :host {
      position: relative;
    }
    
    .custom-select {
      cursor: pointer;
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
      background-color: var(--background-inputs-color);

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
      right: 15px; /* ajústalo para mover la flecha más a la izquierda */
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

      :host .arrow-icon-invalid {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTElEQVR4nO3U60rDMBQH8D6Bggwv03lDURSfISTn33Sv4lvqN0H8otPNGyoqurVN6nyASarWdmRbqR2C7ECgkJzzy7WOM4lJ/FkE9fqUAva7jFV+W6vLWMXUMjUzHQqYVkRHGuhpoqYPVIsi70LMaaIzU0sBJ5GUM0mnJjqMka+mgFYRzAeqJjddSxMd/EDAeabTYETXoZS1vEgoZc3k9NfRQCPPoPuIaH0UooBlBdzY8rXrrmUGB4wtDcAeIik3BiKcryjg1rIjd9rzVq1JbcbmNdGFBXsJhNjpH/8GbGrg0YJcmYkP3YYYs50Z8BpyvpsgnG9p4MmKCLHo5L6i9gvSVsCeL+W2Jnq2TOYyNzL0qn5iHdMsSKEnkV5Zw3JmvdKQBHPd2e+XPjZkFKaAVsfzFpwyI8aA09SvpVk6ksYU0bFp5nssyCT+f3wAiUmBbtQbhy0AAAAASUVORK5CYII=");
      }
    }
    @media (prefers-color-scheme: dark) {
      :host .arrow-icon {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8klEQVR4nO3T20rDQBRG4TxBBSm1VusJRVF8MN9S7wTxplZbT6ioeHiJT4pzMcaJiZoiSBbM1d7/XpPJTJY1NPwZaGEP7RpmtcOsVr4wg0PvjND7hWQOJ2HWMWbj4oGPjH8iQy9kY/bjhlOfuUT/G5J+yOQZVmm6xVoFyRKuCvKr+ebFAtkd1r+QLOM6kbvBSlGoi7NE6Anbif4N3Cf6LyYbLzuGbsE/e8ZO1LeJhwLJQtlxx1c0JXvBLrbwmKifV5aUXNUJr2Gp40nEXzZMDK1PEsk60UufjqSCbIz5rE6CbBBJRrVLcrKjsDpTkTT8f94AOe2OMEdTyy0AAAAASUVORK5CYII=");
      }

      :host .arrow-icon-invalid {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAABSklEQVR4nO2TyUoDQRCG5wkUJLhE44aiKD6Yh5mpvzpDXk9vgnjRaOKGiorLMVtXTiOdZczENhPjBEHyQ0FDVf1fL9WOM9FEf6bQdac0836FOfNbrwpzxngZzzikUJgW4EiAUBOV6kGQHRVS9bw5TXTW8gJOQmAmSgpwaBLd0EB5FFg9CLKmt9dLiA6iAk10Hku2C64bzLlhIQ3mnOnp99FAMbFIiO410XoixPOWhejG2q/UWvzYrrtkhQEPGtj4FqLUigC3lr477fur1qZaPj+vgQvLzl5EqZ3+evG8TQEeLdd1ZTY+8BpaMNubAa9Not0I4vtbQvRkhQCLzg9G1DYgb01gT5i3hej5C4TocmjIwFFtx3snwjS+xOfJgKIFFqYGiWBKzXZ/+tggSTANlGtEC06a6sBOex6+lDokBgOOTZj1WCAT/X99AFkdxacTNXDLAAAAAElFTkSuQmCC");
      }
    }
  `
})
export class CustomSelectComponent {
  @Input({required: true}) options: SelectOption[] = [];
  @Input({required: true}) placeHolder: string = "Selecciona una opcion";
  @Input() formControlApp: FormControl = new FormControl("",[Validators.required]);

  get isInvalid() {
    return (this.formControlApp.touched || this.formControlApp.dirty) && this.formControlApp.invalid;
  }
}
