import { Component, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CounterComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CounterComponent,
    },
  ],
})
export class CounterComponent implements ControlValueAccessor, Validator {
  @Input() max: number = 10;

  quantity = 0;

  onChange = (quantity: number) => {};
  onTouched = () => {};

  touched = false;
  disabled = false;

  onAdd() {
    this.markAsTouched();
    if (!this.disabled && this.quantity < this.max) {
      this.quantity += 1;
      this.onChange(this.quantity);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled && this.quantity > 0) {
      this.quantity -= 1;
      this.onChange(this.quantity);
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  writeValue(quantity: number) {
    this.quantity = quantity;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      this.quantity = 1;
      return {
        mustBePositive: {
          quantity,
        },
      };
    }
    return null;
  }
}
