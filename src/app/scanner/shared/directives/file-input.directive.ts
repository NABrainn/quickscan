import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[appFileInput]',
  standalone: true
})
export class FileInputDirective {

  private _el = inject(ElementRef);

  ngOnInit() {
    this._el.nativeElement.style.display = 'none';
  }

}
