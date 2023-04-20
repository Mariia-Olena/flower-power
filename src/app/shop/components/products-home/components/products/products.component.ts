import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@interfaces/product-plant.interface';
import { ProductsService } from '@services/products.service';

export interface Plant {
  name: string;
  img: string;
  price: number;
  id: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() plants: Plant[] = [];

  ngOnInit(): void {}
}
