import { Component, computed, ElementRef, input, Renderer2, viewChild } from '@angular/core';
import { Colors } from '@dto/Colors';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  btn = viewChild('button', {'read': ElementRef});
  bgc = input<Colors>('four');
  disabled = input<boolean>(false);
  disabledColor = input<Colors>('one');

  computedBgc = computed(() => !this.disabled() ? `var(--${this.bgc()})` : `var(--${this.disabledColor()})`)

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setAttribute(this.btn()?.nativeElement, 'disabled', `${this.disabled()}`);
  }
  
}
