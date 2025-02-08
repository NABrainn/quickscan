import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TextColorDirective } from 'app/scanner/shared/directives/text-color/text-color.directive';
import { CardComponent } from 'app/scanner/ui/card/card.component';

@Component({
    selector: 'app-page-not-found',
    imports: [
        CardComponent,
        RouterLink,
        TextColorDirective
    ],
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
