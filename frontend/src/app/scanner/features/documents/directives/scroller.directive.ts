import { Directive, OnInit, OnDestroy, output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Directive({
  selector: '[appScroller]'
})
export class ScrollerDirective implements OnInit, OnDestroy {

  scroll = output<void>();

  private scrollListener: any;

  ngOnInit(): void {
    this.scrollListener = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        this.scroll.emit();
      }
    };
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }
}