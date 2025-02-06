import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[textColor]',
  standalone: true
})
export class TextColorDirective implements OnInit{

  textColor = input<'one'| 'two' | 'three' | 'four' | 'neutral'>('one');

  el = inject(ElementRef);

  ngOnInit(): void {
    console.log(`var(--${this.textColor()})`)
    this.el.nativeElement.style.color = `var(--${this.textColor()})`;

  }
}
