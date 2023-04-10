import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  constructor() {}

  ngOnInit(): void {}
}
