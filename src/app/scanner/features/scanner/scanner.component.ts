import { Component, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FileInputDirective } from 'app/scanner/shared/directives/file-input.directive';
import { ListItemComponent } from 'app/scanner/ui/list-item/list-item.component';
import { TabComponent } from 'app/scanner/ui/tab/tab.component';
import { ScannerService } from './scanner-service';
import { UploadPanelComponent } from 'app/scanner/ui/upload-panel/upload-panel.component';
import { ButtonComponent } from 'app/scanner/ui/button/button.component';
import { ListComponent } from 'app/scanner/ui/list/list.component';
import { StepperComponent } from './stepper/stepper-component';


@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [
    ListComponent, 
    ListItemComponent, 
    ButtonComponent, 
    UploadPanelComponent, 
    NgClass, 
    StepperComponent, 
    TabComponent,
    FileInputDirective
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {

  scannerService = inject(ScannerService)

  getItems() {
    return this.scannerService.items();
  }
  
  ngOnInit(): void {
    this.scannerService.initEntries();
  }
}
