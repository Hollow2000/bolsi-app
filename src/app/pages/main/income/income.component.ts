import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IncomeViewData } from '../../../core/interfaces/incomeViewData.interface';
import { Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-income',
  imports: [AsyncPipe],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit, OnDestroy {
  private readonly incomeService = inject(IncomeService);

  incomes$ = new Subject<IncomeViewData>();

  ngOnInit(): void {
    this.incomeService.getIncomesViewDataObservable().subscribe(incomes => {
      this.incomes$.next(incomes);
    });
  }

  ngOnDestroy(): void {
    this.incomes$.complete();
  }
}
