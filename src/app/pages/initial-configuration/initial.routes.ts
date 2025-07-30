import { Routes } from "@angular/router";
import { Paths } from "../../core/constants/paths";
import { UnsaveChangesGuard } from "../../core/guards/unsave-changes.guard";

export const InitialRoutes: Routes = [
    {
        path: Paths.POCKETS,
        loadComponent: () => import('../main/pockets/pockets.component').then(c => c.PocketsComponent),
        canDeactivate: [UnsaveChangesGuard]
    },
    {
        path: Paths.PAYMENT_METHODS,
        loadComponent: () => import('../main/payments-methods/payments-methods.component').then(c => c.PaymentsMethodsComponent)
    },
    {
        path: Paths.INCOME,
        loadComponent: () => import('../main/income/income.component').then(c => c.IncomeComponent),
        canDeactivate: [UnsaveChangesGuard]
    },
    {
        path: Paths.BILLS,
        loadComponent: () => import('../main/bills/bills.component').then(c => c.BillsComponent)
    },
    {
        path: Paths.QUICK_SHOPPING,
        loadComponent: () => import('../main/quick-shopping/quick-shopping.component').then(c => c.QuickShoppingComponent)
    }
]