import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';


export const routes: Routes = [
    { 
        path: 'skaner', 
        loadComponent: () => import('./features/stepper-form/stepper-form.component').then((c) => c.StepperFormComponent),
        canActivate: [authGuard],
    },
    {
        path: 'rejestracja',
        loadComponent: () => import('./core/auth/components/signup-form/signup-form.component').then((c) => c.SignupFormComponent)
    },
    {
        path: 'logowanie',
        loadComponent: () => import('./core/auth/components/login-form/login-form.component').then((c) => c.LoginFormComponent)
    },
    {
        path: 'dokumenty',
        loadComponent: () => import('./features/documents-page/documents-page.component').then((c) => c.DocumentsPage),
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: 'skaner',
        pathMatch: 'full',
        
    },
    {
        path: '**',
        loadComponent: () => import('./core/auth/components/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent)
    }
];
