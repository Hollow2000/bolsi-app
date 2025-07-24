import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPercent]'
})
export class PercentDirective {

  constructor(private el: ElementRef, @Optional() @Self() private ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, ''); // eliminar todo lo que no sea número

    // Limita a 2 caracteres
    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    // Agrega el signo %
    this.ngControl.control?.setValue(value)
    input.value = value ? `${value}%` : '';
    input.selectionEnd = input.value.length - 1;
  }

  @HostListener('click') onClick(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const cursorPos = input.selectionStart ?? 0;

    // Si el valor termina en % y el cursor está más allá del número, lo reubica
    if (input.value.endsWith('%')) {
      const numberLength = input.value.length - 1;
      if (cursorPos >= numberLength) {
        input.setSelectionRange(numberLength, numberLength);
      }
    }
  }

  @HostListener('focus') onFocus(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const numberLength = input.value.length - 1;

    if (input.value.endsWith('%')) {
      setTimeout(() => {
        input.setSelectionRange(numberLength, numberLength);
      });
    }
  }
}
