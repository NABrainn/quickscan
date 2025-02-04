import { Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ListComponent } from '@components/list/list.component';
import { ListItemComponent } from '@components/list-item/list-item.component';
import { ButtonComponent } from '@components/button/button.component';
import { UploadPanelComponent } from '@components/upload-panel/upload-panel.component';
import { StepperComponent } from '@components/multi-step-form/stepper-component';
import { TabComponent } from '@components/tab/tab.component';
import { ScannerService } from './service/scanner-service';
import { FileUploadNextStepDirective } from 'app/scanner/shared/directives/file-upload-next-step.directive';
import { FileInputDirective } from 'app/scanner/shared/directives/file-input.directive';


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
    FileUploadNextStepDirective,
    FileInputDirective
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {

  _canEdit = signal<boolean>(false);
  canEdit = computed(() => this._canEdit())
  
  constructor(private scannerService: ScannerService){
  }

  toggleEditMode() {
    this._canEdit.update(curr => !curr)
  }

  getItems() {
    return this.scannerService.items();
  }
  
  ngOnInit(): void {
    this.scannerService.initEntries();
  }
}
