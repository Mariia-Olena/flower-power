import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PlantCard } from '@sharedModule/services/entities/types/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() plant: PlantCard;
  @Output() addToCart = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
