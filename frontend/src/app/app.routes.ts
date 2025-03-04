import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';
import { authGuard } from './scanner/core/auth/auth-guard';
import { stepperGuard } from './scanner/features/scanner/guards/stepper.guard';
import { DocumentsComponent } from './scanner/features/documents/documents.component';

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
                loadComponent: () => import('./scanner/ui/document-card/document-card.component').then((c) => c.DocumentCardComponent), 
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
        loadComponent: () => import('./scanner/features/documents/documents.component').then((c) => DocumentsComponent),
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
