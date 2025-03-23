import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth-guard';
import { stepperGuard } from '@features/scanner/guards/stepper.guard';
import { ScannerComponent } from '@features/scanner/scanner.component';


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
                loadComponent: () => import('./ui/file-upload/file-upload.component').then((c) => c.FileUploadComponent), 
                canActivate: [authGuard, stepperGuard]
            },
            {
                path: 'przeslij', 
                loadComponent: () => import('./ui/document-menu/document-menu.component').then((c) => c.DocumentMenuComponent), 
                canActivate: [authGuard, stepperGuard]
            },
            {
                path: 'gotowe', 
                loadComponent: () => import('./ui/ready-card/ready-card.component').then((c) => c.ReadyCardComponent), 
                canActivate: [authGuard, stepperGuard]
            }
        ]
    },
    {
        path: 'dokumenty',
        loadComponent: () => import('./features/documents-page/documents-page.component').then((c) => c.DocumentsPage),
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: 'skaner/skanuj',
        pathMatch: 'full',
        
    },
    {
        path: '**',
        loadComponent: () => import('./core/auth/components/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent)
    }
];
