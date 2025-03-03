import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    imports: [
        RouterLink,
        RouterLinkActive,
        MatCard,
        MatCardHeader,
        MatIcon,
    ],
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
    readonly router = inject(Router);
    readonly url = this.router.url;
}
