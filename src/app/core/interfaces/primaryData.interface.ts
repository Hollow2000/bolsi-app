import { Frecuency } from "../enums/frecuency.enum";
import { PaymentMethodType } from "../enums/payment-method-type.enum";

export interface Income {
    id?: number;
    name: string;
    amountEstimated: number;
    frecuency: Frecuency;
}

export interface Pocket {
    id?: number;
    name: string;
    percentEstimated: number;
}

export interface PaymentMethod {
    id?: number;
    alias: string;
    type: PaymentMethodType;
    balance?: number; // Efectivo y tarjetas de debito
    statementDay?: number;  // Tarjetas de credito: Fecha de corte
    daysToPay?: number;  // Tarjetas de credito: Cuantos dias despues de la fecha de corte para pagar
    amountCreditLimit?: number;  // Tarjetas de credito: Limite de credito
    amountCreditAvailable?: number;// Tarjetas de credito: Credito disponible a la fecha de corte
}