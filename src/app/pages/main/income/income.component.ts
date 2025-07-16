import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IncomeViewData } from '../../../core/interfaces/incomeViewData.interface';
import { Subject } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { AddElementComponent } from "../../../components/add-element/add-element.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyDirective } from '../../../core/directives/currency.directive';
import { Utils } from '../../../core/Utils';

@Component({
  selector: 'app-income',
  imports: [AsyncPipe, CurrencyPipe, AddElementComponent, ReactiveFormsModule, CurrencyDirective],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit, OnDestroy {
  private readonly incomeService = inject(IncomeService);

  incomes$ = new Subject<IncomeViewData>();
  newIncomeForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    amountEstimated: new FormControl<string | null>(null, [Validators.required]),
  });

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
      addElement.writing = false;
    } else {
      this.newIncomeForm.markAllAsTouched();
    }
  }
}
