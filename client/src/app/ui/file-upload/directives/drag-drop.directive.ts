import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';
import { Colors } from '@shared/enums';

@Directive({
  selector: '[dragDrop]'
})
export class DragDropDirective {

  ref = inject(ElementRef);
  fileDropped = output<File | undefined>();
  prevColor = this.ref.nativeElement.style.backgroundColor;
  

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if(files?.length as number > 0)
      this.fileDropped.emit(files?.[0]);
  }

  @HostListener('dragover', ['$event'])
  onDragover(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.ref.nativeElement.style.backgroundColor = Colors.secondary
  }

  @HostListener('dragleave', ['$event'])
  onDragleave(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.ref.nativeElement.style.backgroundColor = this.prevColor
  }
  
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.ref.nativeElement.style.backgroundColor = this.prevColor


  }

}
