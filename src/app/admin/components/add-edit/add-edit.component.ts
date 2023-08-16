import { Directive } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Directive()
export abstract class AddEditComponent {
  getControl(array: string, index: number): FormGroup {
    return this[array].controls[index] as FormGroup;
  }

  delete(controlName: string, index: number) {
    this[controlName].removeAt(index);
  }
}
