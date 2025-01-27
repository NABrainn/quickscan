import { Component, computed, effect, signal } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { ScannerService } from './service/scanner-service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { UploadPanelComponent } from './components/upload-panel/upload-panel.component';
import { NgClass } from '@angular/common';
import { MultiStepFormComponent } from './components/multi-step-form/multi-step-form.component';

export type Tab = {
  name?: string,
  selected?: boolean,
  enabled?: boolean   
}

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [ListComponent, ListItemComponent, ButtonComponent, UploadPanelComponent, NgClass, MultiStepFormComponent],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {

  _tabs = signal<Tab[]>([
    {name: 'Upload', selected: true, enabled: true},
    {name: 'Ready', selected: false, enabled: true}
  ]);
  tabs = computed(() => this._tabs())



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
