import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  // temporary solution
  @Input() plant: any;

  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  })

  constructor() {}

  ngOnInit(): void {}
}
