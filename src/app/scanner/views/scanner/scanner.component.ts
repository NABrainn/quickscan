import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list/list.component';
import { ScannerService } from './service/scanner-service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ListItemComponent } from '../../shared/components/list-item/list-item.component';
import { UploadPanelComponent } from '../../shared/components/upload-panel/upload-panel.component';
import { NgClass } from '@angular/common';
import { MultiStepFormComponent } from '../../shared/components/multi-step-form/multi-step-form.component';
import { TabComponent } from '../../shared/components/tab/tab.component';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [ListComponent, ListItemComponent, ButtonComponent, UploadPanelComponent, NgClass, MultiStepFormComponent, TabComponent],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {
  
  constructor(private scannerService: ScannerService){
  }

  getItems() {
    return this.scannerService.items();
    // return [];
  }
  
  ngOnInit(): void {
    this.scannerService.initEntries();

  }
}
