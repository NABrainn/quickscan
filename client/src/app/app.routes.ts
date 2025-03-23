import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';
import { authGuard } from './scanner/core/auth/auth-guard';
import { stepperGuard } from './scanner/features/scanner/guards/stepper.guard';

export const routes: Routes = [
    { 
        path: 'skaner', 
        component: ScannerComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'skanuj',
                pathMatch: 'full',
                
            },
            {
                path: 'skanuj', 
                loadComponent: () => import('./scanner/ui/file-upload/file-upload.component').then((c) => c.FileUploadComponent), 
                canActivate: [authGuard, stepperGuard]
            },
            {
                path: 'przeslij', 
                loadComponent: () => import('./scanner/ui/document-menu/document-menu.component').then((c) => c.DocumentMenuComponent), 
                canActivate: [authGuard, stepperGuard]
            },
            {
                path: 'gotowe', 
                loadComponent: () => import('./scanner/ui/ready-card/ready-card.component').then((c) => c.ReadyCardComponent), 
                canActivate: [authGuard, stepperGuard]
            }
        ]
    },
    {
        path: 'dokumenty',
        loadComponent: () => import('./scanner/features/documents-page/documents-page.component').then((c) => c.DocumentsPage),
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: 'skaner/skanuj',
        pathMatch: 'full',
        
    },
    {
        path: '**',
        loadComponent: () => import('./scanner/core/auth/components/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent)
    }

];
