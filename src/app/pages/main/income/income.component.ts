import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IncomeViewData } from '../../../core/interfaces/incomeViewData.interface';
import { Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AddElementComponent } from "../../../components/add-element/add-element.component";
import { Frecuency } from '../../../core/enums/frecuency.enum';

@Component({
  selector: 'app-income',
  imports: [AsyncPipe, AddElementComponent],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit, OnDestroy {
  private readonly incomeService = inject(IncomeService);

  incomes$ = new Subject<IncomeViewData>();

  get frecuencySelect() {
    return ['Frecuencia',...Object.values(Frecuency)]
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
}
