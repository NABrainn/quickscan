import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';
import { ListComponent } from './scanner/ui/list/list.component';
import { UploadPanelComponent } from './scanner/ui/upload-panel/upload-panel.component';
import { PageNotFoundComponent } from './scanner/core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { 
        path: 'scanner', 
        component: ScannerComponent,
        children: [
            { path: 'upload', component: UploadPanelComponent },
            { path: 'ready', component: ListComponent }
        ]
    },
    {
        path: '',
        redirectTo: '/scanner',
        pathMatch: 'full'
    },
    
    {
        path: '**',
        component: PageNotFoundComponent
    }

];
