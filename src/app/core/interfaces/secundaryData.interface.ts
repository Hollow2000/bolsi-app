import { Frecuency } from "../enums/frecuency.enum";

export interface Bill {
    id?: number;
    description: string;
    amountEstimated: number;
    amountReal: number;
    frecuency: Frecuency;
    pocketid?: number;
}

export interface StatementPayment {
    id?: number;
    amount: number;
    paymentMethodid?: number;
    date: Date;
}

export interface Movement {
    id?: number;
    concept: string;
    amount: number;
    date: Date;
    paymentMethodid?: number;
    pocketid?: number;
}

export interface TemplateMovement extends Omit<Movement,'date'>{}