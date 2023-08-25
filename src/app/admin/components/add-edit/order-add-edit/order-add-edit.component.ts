import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import { AddEditComponent } from '../add-edit.component';
import { ActivatedRoute } from '@angular/router';
import { APIorder, OrderAdmin } from '@sharedModule/services/entities/types/order.interface';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss'],
})
export class OrderAddEditComponent extends AddEditComponent<APIorder, OrderAdmin> {
  form = new FormGroup({
    name: new FormControl('', []),
    phone: new FormControl('', []),
    message: new FormControl('', []),
    products: new FormArray([]),
  });

  constructor(private ordersService: OrdersService, private route: ActivatedRoute) {
    super(ordersService, route)
  }

  get products(): FormArray {
    return this.form.controls['products'] as FormArray;
  }

  addProduct() {
    const productForm = new FormGroup({
      quantity: new FormControl('', []),
      name: new FormControl('', []),
      id: new FormControl('', []),
    });

    this.products.push(productForm);
  }

  setFieldsUpfront(): void {
    this.addProduct();
  }

  setForm(): void {}

}
