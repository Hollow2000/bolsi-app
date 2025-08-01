import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrency]'
})
export class CurrencyDirective {
  private readonly el: HTMLInputElement;

  constructor(private readonly elementRef: ElementRef, 
    @Optional() @Self() private ngControl: NgControl) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    const originalValue = this.el.value;
    let cleanValue = originalValue.replace(/[^0-9.]/g, '');

    if (cleanValue.startsWith('.')) {
      cleanValue = '0' + cleanValue;
    }

    if (!cleanValue || cleanValue === '0') {
      this.el.value = '';
      this.ngControl.control?.setValue('');
      return;
    }

    const parts = cleanValue.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';

    if (parts.length > 2) {
      decimalPart = parts.slice(0).join('').substring(0, 2);
    }

    integerPart = integerPart.replace(/^0+(?!$)/, '');
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0, 2);
    }

    let formattedValue = `$${integerPart}`;
    if (originalValue.includes('.')) {
      formattedValue += '.';
      if (decimalPart) {
        formattedValue += decimalPart;
      }
    }

    const selectionStart = this.el.selectionStart ?? 0;
    const beforeLength = this.el.value.length;

    this.ngControl.control?.setValue(cleanValue);
    this.el.value = formattedValue;

    const afterLength = formattedValue.length;
    const diff = afterLength - beforeLength;
    const newPosition = Math.max(selectionStart + diff, 0);
    this.el.setSelectionRange(newPosition, newPosition);
  }
}
