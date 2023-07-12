import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '@sharedModule/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  orderForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    secondName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    region: new FormControl(''),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(private orderService: OrderService) {}

  showErrors(formControlName: string) {
    const { dirty, touched, errors } = this.orderForm.controls[formControlName];
    return dirty && touched && errors;
  }

  onSubmit() {
    this.orderService.createOrder(this.orderForm)

    console.log(this.orderForm);
    
    // this.orderForm.reset();
  }
}
