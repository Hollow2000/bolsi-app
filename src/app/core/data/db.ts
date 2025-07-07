import Dexie, { Table } from 'dexie';
import { Income, PaymentMethod, Pocket } from '../interfaces/primaryData.interface';
import { Bill, Movement, StatementPayment, TemplateMovement } from '../interfaces/secundaryData.interface';
import { Frecuency } from '../enums/frecuency.enum';
import { PaymentMethodType } from '../enums/payment-method-type.enum';

export class AppDB extends Dexie {
    pocketTable!: Table<Pocket, number>;
    incomeTable!: Table<Income, number>;
    paymentMethodTable!: Table<PaymentMethod, number>;
    billTable!: Table<Bill, number>;
    movementTable!: Table<Movement, number>;
    templateTable!: Table<TemplateMovement, number>;
    statePaymentTable!: Table<StatementPayment, number>;

    constructor(){
        super('ngdexieliveQuery');
        this.version(1).stores({
            pocketTable: '++id',
            incomeTable: '++id',
            paymentMethodTable: '++id',
            billTable: '++id, pocketId',
            movementTable: '++id, paymentMethodId, pocketId',
            templateTable: '++id, paymentMethodId, pocketId',
            statePaymentTable: '++id, paymentMethodId'
        });
        this.on('populate', () => { this.populate()})
    }

    async populate() {
        await this.pocketTable.bulkAdd([
            {
                name: 'Necesidades',
                percentEstimated: 50,
                percentUsed: 0
            },
            {
                name: 'Gustos',
                percentEstimated: 30,
                percentUsed: 0
            },
            {
                name: 'Ahorro',
                percentEstimated: 20,
                percentUsed: 0
            }
        ]);

        await this.incomeTable.add({
            name: 'Sueldo',
            frecuency: Frecuency.Biweekly,
            amountEstimated: 12000
        });

        await this.paymentMethodTable.add({
            alias: 'Efectivo',
            type: PaymentMethodType.Cash,
            balance: 0
        });
    }
}

export const db = new AppDB();