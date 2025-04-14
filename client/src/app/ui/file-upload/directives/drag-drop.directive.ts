import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[dragDrop]',
  host: {
    '(drop)': 'onDrop($event)',
    '(dragover)': 'onDragover($event)',
    '(dragleave)': 'onDragleave($event)',
    '(mouseleave)': 'onMouseLeave($event)', 
  }
})
export class DragDropDirective {

  ref = inject(ElementRef);
  fileDropped = output<File | undefined>();

  currColor = 'red';
  prevColor = 'blue';
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if(files?.length as number > 0)
      this.fileDropped.emit(files?.[0]);
  }

  onDragover(event: Event) {
    console.log('kurwa');
    
    event.preventDefault();
    event.stopPropagation();
    this.ref.nativeElement.style.backgroundColor = 'var(--mat-sys-secondary)'
  }

  onDragleave(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.ref.nativeElement.style.backgroundColor = '#487f87'
  }
  
  onMouseLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.ref.nativeElement.style.backgroundColor = '#487f87'


  }

}
