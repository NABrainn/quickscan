import { Component } from '@angular/core';
import { LoadingBarComponent } from 'app/scanner/ui/loading-bar/loading-bar.component';
import { DragoverBehaviorDirective } from 'app/scanner/shared/directives/dragover-behavior.directive';
import { ButtonComponent } from '../button/button.component';

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
