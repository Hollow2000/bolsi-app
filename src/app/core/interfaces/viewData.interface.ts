import { Income } from "./primaryData.interface";
import { Bill } from "./secundaryData.interface";

export interface IncomeViewData {
    incomeTotal: number;
    list: Income[];
}

export interface BillsGroup {
    idPocket: number,
    pocketName: string,
    amountPocket: number,
    bills: Bill[]
}