import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScannerComponent } from './scanner/views/scanner/scanner.component';
import { LoadingBarComponent } from '@components/loading-spinner/loading-bar.component';

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
