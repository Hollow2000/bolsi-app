import { Frecuency } from "../enums/frecuency.enum";
import { MovementType } from "../enums/movement-type.enum";

export interface Bill {
    id?: number;
    description: string;
    amountEstimated: number;
    frecuency: Frecuency;
    pocketId: number;
}

export interface MovementBase {
    id?: number;
    amount: number;
    date: Date;
    paymentMethodId: number;
    type: MovementType;
}

export interface SpenMovement extends MovementBase {
    type: MovementType.Spen;
    concept: string;
    pocketId: number;
}

export interface IncomeMovement extends MovementBase {
    type: MovementType.Income;
}

export type Movement = SpenMovement | IncomeMovement;

export interface TemplateMovement extends Omit<SpenMovement,'date'>{}