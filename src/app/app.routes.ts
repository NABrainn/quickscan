import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';

export const routes: Routes = [
    { 
        path: 'scanner', component: ScannerComponent
    },
    {
        path: '',
        redirectTo: 'scanner',
        pathMatch: 'full'
    },
    
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }

];
