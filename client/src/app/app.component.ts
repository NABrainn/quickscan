import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar'; 
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { LoadingService } from '@core/loading.service';
import { AuthService } from '@core/auth/services/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

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
    authService = inject(AuthService);

    isLoading() {
        return this.loadingService.isLoading();
    }

    isLoggedIn() {
        return this.authService.authenticated()
    }

    logout() {
        this.authService.logout()
    }
}
