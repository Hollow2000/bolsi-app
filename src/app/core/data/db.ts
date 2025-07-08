import Dexie, { Table } from 'dexie';
import { Income, PaymentMethod, Pocket } from '../interfaces/primaryData.interface';
import { Bill, Movement, TemplateMovement } from '../interfaces/secundaryData.interface';
import { Frecuency } from '../enums/frecuency.enum';
import { PaymentMethodType } from '../enums/payment-method-type.enum';
import { MovementType } from '../enums/movement-type.enum';

export class AppDB extends Dexie {
    pocketTable!: Table<Pocket, number>;
    incomeTable!: Table<Income, number>;
    paymentMethodTable!: Table<PaymentMethod, number>;
    billTable!: Table<Bill, number>;
    movementTable!: Table<Movement, number>;
    templateTable!: Table<TemplateMovement, number>;

    constructor(){
        super('ngdexieliveQuery');
        this.version(1).stores({
            pocketTable: '++id',
            incomeTable: '++id',
            paymentMethodTable: '++id',
            billTable: '++id, pocketId',
            movementTable: '++id, paymentMethodId, pocketId',
            templateTable: '++id, paymentMethodId, pocketId',
        });
    }
}

export const db = new AppDB();