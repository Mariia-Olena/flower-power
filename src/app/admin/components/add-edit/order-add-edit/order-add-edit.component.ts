import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AddEditComponent } from '../add-edit.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss'],
})
export class OrderAddEditComponent extends AddEditComponent implements OnInit {
  orderForm = new FormGroup({
    name: new FormControl('', []),
    phone: new FormControl('', []),
    message: new FormControl('', []),
    products: new FormArray([]),
  });

  get products(): FormArray {
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

  ngOnInit(): void {
    this.addProduct();
  }
}
