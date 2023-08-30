import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/\+380\d{9}/)]),
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
      quantity: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]\d*$/)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      id: new FormControl('', [Validators.required]),
    });

    this.products.push(productForm);
  }

  setFieldsUpfront(item?: APIorder): void {
    if (!item) {
      this.addProduct();
      return
    }

    item.products.forEach(item => this.addProduct())
  }

  setValueInForm(): void {
    this.form.patchValue(this.item)
  }
}
