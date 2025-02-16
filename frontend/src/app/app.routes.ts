import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';
import { canActivateAuthRole } from './scanner/core/auth/auth-guard';
import { PageNotFoundComponent } from './scanner/core/auth/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { 
        path: 'scanner', component: ScannerComponent,
        canActivate: [canActivateAuthRole]
    },
    {
        path: '',
        redirectTo: 'scanner',
        pathMatch: 'full',
        
    },
    
    {
        path: '**',
        component: PageNotFoundComponent
    }

];
