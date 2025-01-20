import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScannerComponent } from './scanner/views/scanner/scanner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scannerIO';
}
