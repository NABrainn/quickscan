import { Component, computed, signal, TemplateRef, input, viewChildren, AfterViewInit, viewChild, inject, OnInit, WritableSignal, effect} from '@angular/core';
import { NgClass, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { EmitResponse, UploadPanelComponent } from 'app/scanner/ui/upload-panel/upload-panel.component';
import { ListComponent } from 'app/scanner/ui/list/list.component';
import { ButtonComponent } from 'app/scanner/ui/button/button.component';
import { TabComponent } from 'app/scanner/ui/tab/tab.component';
import { FileInputDirective } from 'app/scanner/shared/directives/file-input.directive';
import { FileUploadService } from '@services/file-upload-service/file-upload-service';
import { LoadingService } from 'app/scanner/core/loading.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

export type Validator = {
  string?: FormControl,
  number?: FormControl,
  status?: WritableSignal<boolean | undefined>
}

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
    RouterLink
  ],
  templateUrl: './stepper-component.html',
  styleUrls: ['./stepper-component.css'],
})
export class StepperComponent implements AfterViewInit, OnInit {

  fileService = inject(FileUploadService)
  loadingService = inject(LoadingService);
  router = inject(Router);

  validator = input<Validator>({
    string: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(25)]
    },
    ),
    number: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(25), Validators.pattern('^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$')]
    },
    ),
  });

  _formStatus = signal<string>('valid');
  valid = computed(() => this._formStatus() === 'invalid' ? true : false)

  items = input<any[]>([]);
  formData = computed(() => this.items().map(el => ({[el.attribute]: el.value})))

  _canEdit = signal<boolean>(false);
  canEdit = computed(() => this._canEdit())

  _error = signal<string>('');
  error = computed(() => this._error())

  _tabs = signal<TabComponent[]>([]);
  tabs = viewChildren(TabComponent);
  
  selected = computed(() => this._tabs().find(el => el.selected()) || undefined);
  _selectedID = computed(() => this._tabs().findIndex(el => el.selected()));

  _next = computed(() => this._tabs().at(this._selectedID() + 1));

  templateOne = viewChild('one', { read: TemplateRef });
  templateTwo = viewChild('two', { read: TemplateRef });

  content = computed(() => {
    if (this.selected()?.label() === 'one') {
      this.router.navigate(['/scanner/upload']);
      return this.templateOne() ?? null;
    }
    else {
      this.router.navigate(['/scanner/ready']);
      return this.templateTwo() ?? null;
    }
  });

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

  handleFileUpload(er: EmitResponse) {
    this._error.set(er.message);
    if(er.data)
      this.fileService.upload(er.data as FormData).subscribe({
        next: () => this.selectNext(),
        error: () => this._error.set('Wystąpił błąd serwera'),
        complete: () => console.log('operation complete')
      })
  }

  handle(event: Event) {
    console.log(this.valid())
    console.log(event)
  }

  onSubmit() {
    console.log('submitted')
  }

  ngAfterViewInit(): void {
    this._tabs.set([...this.tabs()]);
  }

  ngOnInit(): void {
  }
}
