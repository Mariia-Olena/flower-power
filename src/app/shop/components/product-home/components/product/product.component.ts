import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface Plant {
  slides: { img: string }[];
  name: string;
  price: number;
  size: number[];
  potType: string[];
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  @Input() plant: Plant = {
    slides: [],
    name: '',
    price: 0,
    size: [],
    potType: []
  };

  constructor() {}

  ngOnInit(): void {}
}
