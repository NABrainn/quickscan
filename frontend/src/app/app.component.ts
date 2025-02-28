import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar'; 
import { LoadingService } from './scanner/core/loading.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatProgressBar,
        MatToolbar,
        MatIcon,
        MatButtonModule
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
