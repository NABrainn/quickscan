import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCanEdit]',
  standalone: true
})
export class CanEditDirective {

  constructor(private el: ElementRef) {    
    this.el.nativeElement.style.color = 'yellow';
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }
  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }

}
