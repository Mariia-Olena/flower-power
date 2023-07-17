import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '@sharedModule/services/cart-v2.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '@sharedModule/services/order.service';
import { Router } from '@angular/router';
import { StorageService } from '@sharedModule/services/storage.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Input() cart: CartItem[];

  orderForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('+38 0', [
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

  constructor(
    private orderService: OrderService,
    private router: Router,
    private storage: StorageService
  ) {}

  onPhoneNumberChange() {
    this.orderForm.controls.phone.setValue(
      '+' + this.orderForm.controls.phone.value.replace(/\s/, '')
    );
  }

  showErrors(formControlName: string) {
    const { dirty, touched, errors } = this.orderForm.controls[formControlName];
    return dirty && touched && errors;
  }

  onSubmit() {
    const order = this.orderService.createOrder(this.orderForm, this.cart);
    this.orderService.postOrder(order).subscribe(
      (res) => {
        this.router.navigate(['confirmation']),
          this.storage.setToLocalStorage(
            'orderForm',
            this.orderForm.getRawValue()
          );
      },
      (error) => {
        this.orderService.showModal = true;
      }
    );
  }

  ngOnInit(): void {
    const {
      email,
      phone,
      firstName,
      secondName,
      country,
      region,
      city,
      address,
    } = this.storage.getFromLocalStorage('orderForm');

    this.orderForm.patchValue({
      email,
      phone,
      firstName,
      secondName,
      country,
      region,
      city,
      address,
    });
  }
}
