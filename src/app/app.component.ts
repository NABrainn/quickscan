import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 

@Component({
    selector: 'app-root',
    imports: [MatSlideToggleModule, MatBadgeModule, MatButtonToggleModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scannerIO';
  
}
