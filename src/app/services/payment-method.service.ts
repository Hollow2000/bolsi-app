import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PaymentMethod } from '../core/interfaces/primaryData.interface';
import { db } from '../core/data/db';
import { PaymentMethodType } from '../core/enums/payment-method-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseService<PaymentMethod> {
  protected override table = db.paymentMethodTable;

  initPaymentMethods() {
    return this.table.add({
      alias: 'Efectivo',
      type: PaymentMethodType.Cash,
      balance: 0
    });
  }
}
