import { Injectable } from '@angular/core';
import { db } from '../core/data/db';
import { Income } from '../core/interfaces/primaryData.interface';
import { liveQuery, Observable } from 'dexie';
import { IncomeViewData } from '../core/interfaces/incomeViewData.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService extends BaseService<Income> {
  protected override table = db.incomeTable;
  getIncomesViewDataObservable(): Observable<IncomeViewData> {
    return liveQuery(async () => {
      const list = await db.incomeTable.toArray();
      let incomeTotal = 0;
      list.forEach(income => {
        incomeTotal += income.amountEstimated;
      });
      return {incomeTotal, list};
    });
  }
}
