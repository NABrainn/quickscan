import { Component, input, model } from '@angular/core';
import { StepperService } from '@services/stepper.service';

@Component({
  selector: 'app-tab',
  standalone: true,
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  label = input<string>('Default');
  enabled = model<boolean>(true);
  selected = model<boolean>();

  constructor(private stepperService: StepperService) {
  }

  handleClick(label: string) {
    this.stepperService.handleTabClick(label)
  }

  ngOnInit() {
    
  }
}
