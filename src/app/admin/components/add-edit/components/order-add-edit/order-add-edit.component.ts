import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import { AddEditComponent } from '@admin/components/add-edit/add-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  APIorder,
  Order,
} from '@sharedModule/services/entities/types/order.interface';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss'],
})
export class OrderAddEditComponent extends AddEditComponent<APIorder, Order> {
  url = 'orders';

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/\+380\d{9}/),
      Validators.maxLength(13),
    ]),
    message: new FormControl('', []),
    products: new FormArray([]),
  });

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(ordersService, route, router);
  }

  get products(): FormArray {
    return this.form.controls['products'] as FormArray;
  }

  addProduct() {
    const productForm = new FormGroup({
      quantity: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^[1-9]\d*$/),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      id: new FormControl('', [Validators.required]),
    });

    this.products.push(productForm);
  }

  setFieldsUpfront(): void {
    !this.item
      ? this.addProduct()
      : this.item.products.map((item) => this.addProduct());
  }

  setValueInForm(): void {
    this.form.patchValue(this.item);
  }

  onResetButton() {
    this.products.clear();
    this.setFieldsUpfront();
    this.setValueInForm();
  }
}
