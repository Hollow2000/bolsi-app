import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Bill } from '../core/interfaces/secundaryData.interface';
import { db } from '../core/data/db';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService<Bill> {
  protected override table = db.billTable;
}
