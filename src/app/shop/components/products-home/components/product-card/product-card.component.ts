import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlantCard } from '../products/types/plant.interface';
import { CartService } from '@sharedModule/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() plant: PlantCard;
  @Output() addToCart = new EventEmitter<string>();

  constructor(private cartService: CartService) {}

  isProductInCart(id: string): boolean {
    if (this.cartService.getProductsInCart()[id]) {
      return true
    } else {
      return false
    }
  }

  ngOnInit(): void {}
}
