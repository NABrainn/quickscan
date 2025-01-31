import { Component, computed, contentChild, contentChildren, signal, TemplateRef } from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { UploadPanelComponent } from '@components/upload-panel/upload-panel.component';
import { ListComponent } from '@components/list/list.component';
import { TabComponent } from '@components/tab/tab.component';
import { StepperService } from '@services/stepper.service';


@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [NgClass, UploadPanelComponent, ListComponent, TitleCasePipe, NgTemplateOutlet, NgIf],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css',
})
export class MultiStepFormComponent {

  _selected = signal<string | undefined>('');
  tabs = contentChildren(TabComponent);

  uploadTemplate = contentChild('upload', {read: TemplateRef})
  readyTemplate = contentChild('ready', {read: TemplateRef})

  stepContent = computed(() => {
    if(this.stepperService._selected() === 'upload')
      return this.uploadTemplate() ?? null;
    else {
      return this.readyTemplate() ?? null;
    }
  })

  constructor(private stepperService: StepperService){}

  ngAfterContentInit() {
    this.stepperService._selected.set(this.tabs().find(component => component.selected() === true)?.label())
    this.stepperService._tabs.set([...this.tabs()]);
  }
}
