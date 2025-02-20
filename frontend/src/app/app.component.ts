import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar'; 
import { LoadingService } from './scanner/core/loading.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MatProgressBar
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    loadingService = inject(LoadingService);

    isLoading() {
        return this.loadingService.isLoading();
    }
}
