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

  dragoverBehavior = input<colors>()

  constructor(private el: ElementRef) { }

  @HostListener('dragover', ['$event']) 
  onDragOver(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.style.backgroundColor = `var(--${this.dragoverBehavior()?.enter})`;
  }

  @HostListener('dragleave', ['$event']) 
  onDragLeave(){
    console.log(this.dragoverBehavior()?.leave)
    this.el.nativeElement.style.backgroundColor = `var(--${this.dragoverBehavior()?.leave})`;
  }

  @HostListener('drop', ['$event']) 
  onDrop(){
    this.el.nativeElement.style.backgroundColor = `var(--${this.dragoverBehavior()?.leave})`;
  }

}
