import { Component, computed, contentChild, contentChildren, signal, TemplateRef } from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { UploadPanelComponent } from '../upload-panel/upload-panel.component';
import { ListComponent } from '../list/list.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [NgClass, UploadPanelComponent, ListComponent, TitleCasePipe, NgTemplateOutlet, NgIf],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css',
})
export class MultiStepFormComponent {

  _selected = signal<string | undefined>('');
  selected = computed(() => this._selected())

  tabs = contentChildren(TabComponent);

  uploadTemplate = contentChild('upload', {read: TemplateRef})
  readyTemplate = contentChild('ready', {read: TemplateRef})

  stepContent = computed(() => {
    if(this.selected() === 'upload')
      return this.uploadTemplate() ?? null;

    else {
      return this.readyTemplate() ?? null;
    }
  })

  handleTabClick(label: string) {
    this.tabs().map(component => component.selected.set(component.label() === label))
    this._selected.set(label);
  }

  ngAfterContentInit() {
    this._selected.set(this.tabs().find(component => component.selected() === true)?.label())
  }
}
