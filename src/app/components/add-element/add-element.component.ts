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
          <div class="add-icon"></div>
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
    }

    @media (prefers-color-scheme: light) {
      .add-icon {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABiElEQVR4nO2WTU7DMBCFcwAkYgcWUIo4Bz8HQIKKW1TtTFKuwg4EYsGSPT+CZqblEi3iFBR2tCpyQIAqJxk3jeiiI80mUvzlPT9P7HmLmrdS0eOmBg418r0C7ivg9+/um2caGVWjW50ZUNfbFY18ppGHGnmc2UAjjXS93OKtQtAA+UghveUCJ1oBDQKIa9MpBWp9KXCDTqiPnJXqItA/cLFyHfKGxF4Vxtuqybsy2x/Wc8EK6VKi5udDRerpPP/ISNLrDOahcTLdZqRIun+O4HEABFngu7LAGvkma39fygIr4H46GGhgS2/qC2nrWNKugAZuYKQdV7CPnT03MPJzeVZTb/7CpZGxNMVNbqRb3ehWSxkgQB+ZAySBA1/MHsynmdBkoXq7Yku3Le229FrO7+vKcXctF5yoxs6+1PIci0d+2DkUQX8tpKjwRQA49KapAOKaxHabvT7wgVeklsKnVQV8kiRToFIhXYn3VFLmOJhfmwa6NVPI3FKSBuqZ4eAjNXOPzKK8f6hP+OCuevDHrEUAAAAASUVORK5CYII=");
      }
    }

    @media (prefers-color-scheme: dark) {
      .add-icon {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdUlEQVR4nO2WS0oDQRCG+xJiuvLAc/g4gKDBa2gerpyqSU7hTlFcuHTv4yaJuPFRFddGdyYoHSMYZiZTPclgFikoCMMMH/9ff1famGUtWlmUikVpAPGdJekC8Yfr8W/3rA5tLs8NWGo9F4H4FIgHQPI1tZGHluRqFV/XZlMZyh4gv6cCI819IK5mg6IcOgX+0An1zSxKh5mhf+Bq5cXgpaSyN+B1i7Kpsb189AQaiy80an7fV878LA1aUaXXHzxwTiaDSZra+fmBxc27lggG5Nu8wBbleprVD7mBSbrJikcHP5rexA+SBcSknfteYBvKhjc4lC0vsEW5zzFcnQUMF0k9R8X7yYrbXM5lgSB/Tl0gY7vP5w22xCdG+ccfPVYxaY9Pb0TtW6X1aI2mCkFvW2t5CnQIyLsq6MTenvUigNIwWQqIqxrb4+wF4h0zSxXC3gogH7tkKq29VM/U42ZSA+Ibt4VGt5Sf7rjlAMQHqUdmWeYf6htYjBI8gJlPIQAAAABJRU5ErkJggg==");
      }
    }
  `
})
export class AddElementComponent {
  @Input({ required: true }) label: string = '';
  writing = false;
}
