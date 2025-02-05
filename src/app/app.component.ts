import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from 'app/scanner/ui/loading-bar/loading-bar.component';
import { ScannerComponent } from './scanner/features/scanner/scanner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScannerComponent, LoadingBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scannerIO';
  
}
