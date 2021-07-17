import {Directive, ElementRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';

@Directive({
  selector: '[ngxAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(
    private element: ElementRef<HTMLInputElement>,
    private cdr: ChangeDetectorRef
    ) {}

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
    this.cdr.detectChanges();
  }
}