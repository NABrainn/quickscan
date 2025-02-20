import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';
import { canActivateAuthRole } from './scanner/core/auth/auth-guard';
import { PageNotFoundComponent } from './scanner/core/auth/components/page-not-found/page-not-found.component';
import { FileUploadComponent } from './scanner/ui/file-upload/file-upload.component';
import { DocumentCardComponent } from './scanner/ui/document-card/document-card.component';
import { ReadyCardComponent } from './scanner/ui/ready-card/ready-card.component';

export const routes: Routes = [
    { 
        path: 'skaner', component: ScannerComponent,
        canActivate: [canActivateAuthRole],
        children: [
            {
                path: 'skanuj', component: FileUploadComponent
            },
            {
                path: 'przeslij', component: DocumentCardComponent
            },
            {
                path: 'gotowe', component: ReadyCardComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: 'skaner',
        pathMatch: 'full',
        
    },
    
    {
        path: '**',
        component: PageNotFoundComponent
    }

];
