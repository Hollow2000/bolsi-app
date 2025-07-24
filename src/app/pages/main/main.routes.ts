import { Routes } from "@angular/router";
import { Paths } from "../../core/constants/paths";

export const mainRoutes: Routes = [
    {
        path: Paths.DASH_BOARD, 
        loadComponent: () => import('./dash-board/dash-board.component').then(c => c.DashBoardComponent)
    },
    {
        path: Paths.BILLS,
        loadComponent: () => import('./bills/bills.component').then(c => c.BillsComponent)
    },
    {
        path: Paths.INCOME,
        loadComponent: () => import('./income/income.component').then(c => c.IncomeComponent)
    },
    {
        path: Paths.PAYMENT_METHODS,
        loadComponent: () => import('./payments-methods/payments-methods.component').then(c => c.PaymentsMethodsComponent)
    },
    {
        path: Paths.POCKETS,
        loadComponent: () => import('./pockets/pockets.component').then(c => c.PocketsComponent)
    },
    {
        path: Paths.SHOPPING,
        loadComponent: () => import('./shopping/shopping.component').then(c => c.ShoppingComponent)
    },
    {
        path: Paths.QUICK_SHOPPING,
        loadComponent: () => import('./quick-shopping/quick-shopping.component').then(c => c.QuickShoppingComponent)
    },
    {
        path: Paths.NOT_FOUND,
        redirectTo: Paths.DASH_BOARD
    }
];