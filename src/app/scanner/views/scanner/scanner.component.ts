import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ListComponent } from '@components/list/list.component';
import { ListItemComponent } from '@components/list-item/list-item.component';
import { ButtonComponent } from '@components/button/button.component';
import { UploadPanelComponent } from '@components/upload-panel/upload-panel.component';
import { MultiStepFormComponent } from '@components/multi-step-form/multi-step-form.component';
import { TabComponent } from '@components/tab/tab.component';
import { ScannerService } from './service/scanner-service';


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
