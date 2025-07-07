import { Routes } from '@angular/router';
import { Paths } from './core/constants/paths';

export const routes: Routes = [
    {
        path: Paths.WELCOME,
        loadComponent:() => import('./pages/welcome/welcome.component').then(c => c.WelcomeComponent)
    },
    {
        path: Paths.MAIN,
        loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent),
        loadChildren: () => import('./pages/main/main.routes').then(c => c.mainRoutes)
    },
    {
        path: Paths.AUTH,
        loadChildren: () => import('./pages/auth/auth.routes').then(c => c.authRoutes),
        canActivate: [false]
    },
    {
        path: Paths.NOT_FOUND,
        redirectTo: Paths.MAIN
    }
];
