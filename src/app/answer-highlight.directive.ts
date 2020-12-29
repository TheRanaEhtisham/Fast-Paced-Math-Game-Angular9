import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private el: ElementRef, private controlName: NgControl) {
  }

  ngOnInit() {
    console.log(this.controlName.control.parent)
    this.controlName.control.parent.valueChanges.pipe(
      map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))),
      // filter(val => val < 0.2)
    ).subscribe(value => {
      if (value < 0.2) {
        this.el.nativeElement.classList.add('close');
      } else {
        this.el.nativeElement.classList.remove('close');
      }
    })
  }
}
