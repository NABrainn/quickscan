import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';
import { canActivateAuthRole } from './scanner/core/auth/auth-guard';
import { PageNotFoundComponent } from './scanner/core/auth/components/page-not-found/page-not-found.component';
import { FileUploadComponent } from './scanner/ui/file-upload/file-upload.component';
import { stepperGuard } from './scanner/features/scanner/guards/stepper.guard';

export const routes: Routes = [
    { 
        path: 'skaner', component: ScannerComponent,
        canActivate: [canActivateAuthRole],
        children: [
            {
                path: 'skanuj', component: FileUploadComponent, canActivate: [stepperGuard]
            },
            {
                path: 'przeslij', loadComponent: () => import('./scanner/ui/document-card/document-card.component').then((c) => c.DocumentCardComponent), canActivate: [stepperGuard]
            },
            {
                path: 'gotowe', loadComponent: () => import('./scanner/ui/ready-card/ready-card.component').then((c) => c.ReadyCardComponent), canActivate: [stepperGuard]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'skaner/skanuj',
        pathMatch: 'full',
        
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }

];
