
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolutions = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },
    [
      MathValidators.addition('answer', 'a', 'b')
      // MathValidators.addition
    ])
  constructor() { }

  ngOnInit(): void {
    // const startTime = new Date();
    // let numberSolved = 0;
    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(100),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        }
      }, { numberSolved: 0, startTime: new Date() })
    ).subscribe(({ numberSolved, startTime }) => {
      // numberSolved++;
      this.secondsPerSolutions = (
        new Date().getTime() - startTime.getTime()
      ) / numberSolved / 1000;
      // use filter to remove the if statement
      // if (value === 'INVALID') {
      //   return;
      // }

      //If you update all the values 
      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      })

      // if you want to update some values of form
      // this.mathForm.patchValue({
      //   b: this.randomNumber(),
      //   answer: ''
      // })

      // update values statically 
      // this.mathForm.controls.a.setValue(this.randomNumber());
      // this.mathForm.controls.b.setValue(this.randomNumber());
      // this.mathForm.controls.answer.setValue('');
    })
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

}
