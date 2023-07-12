import { Component, Input } from '@angular/core';
import { CartItem } from '@sharedModule/services/cart-v2.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '@sharedModule/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  @Input() cart: CartItem[];

  orderForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('+', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
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
    this.orderService.createOrder(this.orderForm, this.cart)
    // this.orderForm.reset();
  }
}
