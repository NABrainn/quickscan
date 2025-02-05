import {
  Component,
  computed,
  contentChild,
  contentChildren,
  signal,
  TemplateRef,
  AfterContentInit,
  input,
  OnInit,
  viewChildren,
  AfterViewInit,
  viewChild,
} from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { UploadPanelComponent } from 'app/scanner/ui/upload-panel/upload-panel.component';
import { ListComponent } from 'app/scanner/ui/list/list.component';
import { ButtonComponent } from 'app/scanner/ui/button/button.component';
import { TabComponent } from 'app/scanner/ui/tab/tab.component';
import { FileInputDirective } from 'app/scanner/shared/directives/file-input.directive';
import { FileSelectBehaviorDirective } from './directives/file-select-behavior.directive';
import { FileDropBehaviorDirective } from './directives/file-drop-behavior.directive';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    NgClass, 
    UploadPanelComponent, 
    ButtonComponent,
    TabComponent,
    ListComponent, 
    TitleCasePipe, 
    NgTemplateOutlet,  
    FileInputDirective,
    FileDropBehaviorDirective,
    FileSelectBehaviorDirective
  ],
  templateUrl: './stepper-component.html',
  styleUrls: ['./stepper-component.css'],
})
export class StepperComponent implements AfterContentInit, AfterViewInit, OnInit {

  items = input<any[]>([]);

  _canEdit = signal<boolean>(false);
  canEdit = computed(() => this._canEdit())

  _tabs = signal<TabComponent[]>([]);
  tabs = viewChildren(TabComponent);
  
  selected = computed(() => this._tabs().find(el => el.selected()) || undefined);
  _selectedID = computed(() => this._tabs().findIndex(el => el.selected()));

  _next = computed(() => this._tabs().at(this._selectedID() + 1));

  templateOne = viewChild('one', { read: TemplateRef });
  templateTwo = viewChild('two', { read: TemplateRef });


  content = computed(() => this.selected()?.label() === 'one' ? this.templateOne() ?? null : this.templateTwo() ?? null);


  toggleEditMode() {
    this._canEdit.update(curr => !curr)
  }

  selectNext(): void {
    const nextTab = this._next();
    this._tabs.update(prev => {
      prev.map(el => {
        el.selected.set(el?.label() === nextTab?.label())
      })
      return [...prev];
    })
  }

  handleTabClick(tab: TabComponent) {
    this._tabs.update(prev => {
      prev.forEach(el => el.selected.set(el === tab));
      return [...prev];
    });
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit(): void {
    this._tabs.set([...this.tabs()]);
  }

  ngOnInit(): void {
  }
}
