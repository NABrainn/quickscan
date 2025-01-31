import { Directive, ElementRef, HostListener, input } from '@angular/core';

type colors = {
    enter: 'one'| 'two' | 'three' | 'four' | 'neutral',
    leave: 'one'| 'two' | 'three' | 'four' | 'neutral'
}

@Directive({
  selector: '[dragoverBehavior]',
  standalone: true
})
export class DragoverBehaviorDirective {

  color = input<colors>()

  constructor(private el: ElementRef) { }

  @HostListener('dragover') onDragOver(){
    this.el.nativeElement.style.backgroundColor = `var(--one)`;
  }

  @HostListener('dragleave') onDragLeave(){
    this.el.nativeElement.style.backgroundColor = `var(--two)`;
  }

}
