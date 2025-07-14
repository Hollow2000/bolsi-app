import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IncomeViewData } from '../../../core/interfaces/incomeViewData.interface';
import { Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AddElementComponent } from "../../../components/add-element/add-element.component";
import { Frecuency } from '../../../core/enums/frecuency.enum';
import { CustomSelectComponent } from "../../../components/custom-select/custom-select.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Income } from '../../../core/interfaces/primaryData.interface';

@Component({
  selector: 'app-income',
  imports: [AsyncPipe, AddElementComponent, CustomSelectComponent, ReactiveFormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit, OnDestroy {
  private readonly incomeService = inject(IncomeService);

  incomes$ = new Subject<IncomeViewData>();
  newIncomeForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    amountEstimated: new FormControl<number | null>(null, [Validators.required]),
    frecuency: new FormControl<string>("",[Validators.required])
  });
  get frecuencySelect() {
    return Object.values(Frecuency);
  }

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

  submitNew() {
    console.log(this.newIncomeForm);
    
  }
}
