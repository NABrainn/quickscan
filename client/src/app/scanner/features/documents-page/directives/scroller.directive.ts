import { Directive, OnInit, OnDestroy, output } from '@angular/core';

@Directive({
  selector: '[scroller]'
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