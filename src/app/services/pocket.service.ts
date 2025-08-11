import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Pocket } from '../core/interfaces/primaryData.interface';
import { db } from '../core/data/db';

@Injectable({
  providedIn: 'root'
})
export class PocketService extends BaseService<Pocket> {
  protected override table = db.pocketTable;

  initPockets() {
    return this.table.bulkAdd([
      {
        name: 'Necesidades🏠',
        percentEstimated: 50
      },
      {
        name: 'Gustos🍿',
        percentEstimated: 30
      },
      {
        name: 'Ahorro💰',
        percentEstimated: 20
      }
    ]);
  }

  async getTotalPercent(): Promise<number> {
    const list = await this.getList();
    let total = 0;
    list.forEach(pocket => {
      total = total + Number(pocket.percentEstimated)
    });
    return total;
  }

  updatePockets(updates: Pocket[]) {
    this.table.bulkUpdate(
      updates.map(pocket => {
        return {changes: pocket, key: pocket.id!}
      })
    );
  }
}
