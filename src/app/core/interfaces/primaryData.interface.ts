import { Frecuency } from "../enums/frecuency.enum";
import { PaymentMethodType } from "../enums/payment-method-type.enum";

export interface Income {
    id?: number;
    name: string;
    amountEstimated: number;
    amountReal?: number;
    frecuency: Frecuency;
    date?: Date;
}

export interface Pocket {
    id?: number;
    name: string;
    percentEstimated: number;
    percentUsed: number;
}

export interface PaymentMethod {
    id?: number;
    alias: string;
    type: PaymentMethodType;
    balance?: number; // Efectivo y tarjetas de debito
    statementDate?: Date; // Tarjetas de credito
    limitPaymentDate?: Date;// Tarjetas de credito
    amountCredit?: number;// Tarjetas de credito
    amountUsed?: number;// Tarjetas de credito
}