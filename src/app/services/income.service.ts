import { Injectable } from '@angular/core';
import { db } from '../core/data/db';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  constructor() { }

  getIcomeList() {
    return db.incomeTable.toArray();
  }
}
