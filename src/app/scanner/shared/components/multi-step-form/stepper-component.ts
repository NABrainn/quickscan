import {
  Component,
  computed,
  contentChild,
  contentChildren,
  signal,
  TemplateRef,
  AfterContentInit,
} from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { UploadPanelComponent } from '@components/upload-panel/upload-panel.component';
import { ListComponent } from '@components/list/list.component';
import { TabComponent } from '@components/tab/tab.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    NgClass, 
    UploadPanelComponent, 
    ListComponent, 
    TitleCasePipe, 
    NgTemplateOutlet,  
    NgIf
  ],
  templateUrl: './stepper-component.html',
  styleUrls: ['./stepper-component.css'],
})
export class StepperComponent implements AfterContentInit {


  _tabs = signal<TabComponent[]>([]);
  tabs = contentChildren(TabComponent);
  
  selected = computed(() => this._tabs().find(el => el.selected()) || undefined);
  _selectedID = computed(() => this._tabs().findIndex(el => el.selected()));

  _next = computed(() => this._tabs().at(this._selectedID() + 1));

  templateOne = contentChild('one', { read: TemplateRef });
  templateTwo = contentChild('two', { read: TemplateRef });


  content = computed(() => this.selected()?.label() === 'one' ? this.templateOne() ?? null : this.templateTwo() ?? null);


  selectNext(): void {
    const nextTab = this._next();
    this._tabs.update(prev => {
      prev.map(el => {
        el.selected.set(el?.label() === nextTab?.label())
      })
      return [...prev];
    })
  }

  ngAfterContentInit() {
    this._tabs.set([...this.tabs()]);

    this.tabs().forEach(tab => {
      tab.tabClicked.subscribe(data => {
        this._tabs.update(prev => {
          prev.forEach(el => el.selected.set(el === data));
          return [...prev];
        });
      });
    });
  }
}
