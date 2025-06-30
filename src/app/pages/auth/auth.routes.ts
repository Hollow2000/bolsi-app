import { Routes } from "@angular/router";
import { Paths } from "../../core/constants/paths";

export const authRoutes: Routes = [
    {
        path: Paths.LOGIN, 
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: Paths.REGISTER,
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: Paths.NOT_FOUND,
        redirectTo: Paths.LOGIN
    }
];