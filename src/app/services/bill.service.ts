import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Bill } from '../core/interfaces/secundaryData.interface';
import { db } from '../core/data/db';
import { liveQuery, Observable } from 'dexie';
import { BillsGroup } from '../core/interfaces/viewData.interface';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService<Bill> {
  protected override table = db.billTable;

  getBillsGroupList$(): Observable<BillsGroup[]> {
    return liveQuery(async () => {
      const pockets = await db.pocketTable.toArray();

      const billsGroups = await Promise.all(
        pockets.map(async pocket => {
          const bills = await this.table.where('pocketId').equals(pocket.id!).toArray();
          const amountPocket = bills.reduce((sum, bill) => sum + bill.amountEstimated, 0);

          return {
            idPocket: pocket.id!,
            pocketName: pocket.name,
            amountPocket,
            bills
          };
        })
      );

      return billsGroups;
    });
  }

}
