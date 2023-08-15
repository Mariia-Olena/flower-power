import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  orderForm = new FormGroup({
    name: new FormControl('', []),
    phone: new FormControl('', []),
    message: new FormControl('', []),
    products: new FormArray([]),
  });

  get products() {
    return this.orderForm.controls['products'] as FormArray;
  }

  addProduct() {
    const productForm = new FormGroup({
      quantity: new FormControl('', []),
      name: new FormControl('', []),
      id: new FormControl('', []),
    });

    this.products.push(productForm);
  }

  deleteProduct(index: number) {
    this.products.removeAt(index);
  }
}
