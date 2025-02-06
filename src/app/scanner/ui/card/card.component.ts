import { Component, ElementRef, inject, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{

  el = inject(ElementRef)

  imgUrl = input<string>('');
  imgWidth = input<string>('100px');
}
