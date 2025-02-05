import { Component, ElementRef, input, Renderer2, viewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  btn = viewChild('button', {'read': ElementRef});
  bgc = input<'one' | 'two' | 'three' | 'four' | 'neutral'>('four');

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.btn()?.nativeElement, 'background-color', `var(--${this.bgc()})`)
  }
  
}
