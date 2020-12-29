import { AbstractControl } from "@angular/forms";

export class MathValidators {

    static addition(target: string, sourceOne: string, sourceTwo: string) {
        return (form: AbstractControl) => {
            const sum = form.value[target];
            const firstNumber = form.value[sourceOne];
            const secongNumber = form.value[sourceTwo];

            if (firstNumber + secongNumber === parseInt(sum)) {
                return null;
            }

            return { addition: true }
        }
    }
    // static addition(form: AbstractControl) {
    //     const { a, b, answer } = form.value;
    //     if (a + b === parseInt(answer)) {
    //         return null
    //     }
    //     return { additon: 'Shanza' };
    // }
}
