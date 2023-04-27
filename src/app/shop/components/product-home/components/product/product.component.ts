import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '@sharedModule/services/cart.service';
import { Plant } from './types/plant.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  @Input() plant: Plant;

  constructor( private cartService: CartService) {}

  addProductToCart(product: Plant) {
    this.cartService.addProduct(product)
  }

  ngOnInit(): void {}
}
