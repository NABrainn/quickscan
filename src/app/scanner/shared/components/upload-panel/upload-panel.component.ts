import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { DragoverBehaviorDirective } from '../../directives/dragover-behavior.directive';
import { LoadingBarComponent } from '@components/loading-spinner/loading-bar.component';

@Component({
  selector: 'app-upload-panel',
  standalone: true,
  imports: [ButtonComponent, DragoverBehaviorDirective, LoadingBarComponent],
  templateUrl: './upload-panel.component.html',
  styleUrl: './upload-panel.component.css'
})
export class UploadPanelComponent {

  ngOnInit() {
  }
}
