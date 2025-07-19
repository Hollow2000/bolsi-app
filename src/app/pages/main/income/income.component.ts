import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IncomeViewData } from '../../../core/interfaces/incomeViewData.interface';
import { Subject } from 'rxjs';
import { AsyncPipe, CurrencyPipe, formatCurrency } from '@angular/common';
import { AddElementComponent } from "../../../components/add-element/add-element.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyDirective } from '../../../core/directives/currency.directive';
import { Utils } from '../../../core/Utils';
import { animate, style, transition, trigger } from '@angular/animations';
import { Income } from '../../../core/interfaces/primaryData.interface';

@Component({
  selector: 'app-income',
  imports: [AsyncPipe, CurrencyPipe, AddElementComponent, ReactiveFormsModule, CurrencyDirective],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class IncomeComponent implements OnInit, OnDestroy {
  private readonly incomeService = inject(IncomeService);

  incomes$ = new Subject<IncomeViewData>();
  newIncomeForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5)]),
    amountEstimated: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(11)]),
  });
  incomeEditId?: number;

  ngOnInit(): void {
    this.incomeService.getIncomesViewDataObservable().subscribe(incomes => {
      this.incomes$.next(incomes);
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.incomes$.complete();
  }

  async submitNew(addElement: AddElementComponent) {
    if (this.newIncomeForm.valid) {
      await this.incomeService.add({
        name: this.newIncomeForm.value.name!,
        amountEstimated: Utils.clearNumberFormat(this.newIncomeForm.value.amountEstimated!),
      });
      this.newIncomeForm.reset();
      addElement.writing = false;
    } else {
      this.newIncomeForm.markAllAsTouched();
    }
  }

  cancelNew(addElement: AddElementComponent) {
    this.newIncomeForm.reset();
    addElement.writing = false
  }

  openEdit(income: Income, item: HTMLDivElement) {
    this.incomeEditId = income.id;
    this.newIncomeForm.patchValue({
      name: income.name,
      amountEstimated: income.amountEstimated.toLocaleString("es-MX", { style: "currency", currency: "MXN" })
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }, 100);

  }

  cancelEdit() {
    this.newIncomeForm.reset();
    this.incomeEditId = undefined;
  }

  submitEdit(incomeId: number) {
    this.incomeService.update(incomeId,
      {
        name: this.newIncomeForm.value.name!,
        amountEstimated: Utils.clearNumberFormat(this.newIncomeForm.value.amountEstimated!),
      }
    );
    this.newIncomeForm.reset();
    this.incomeEditId = undefined;
  }

  deleteIncome(incomeID: number) {
    this.incomeService.delete(incomeID);
  }
}
