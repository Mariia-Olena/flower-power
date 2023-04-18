import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@sharedModule/services/products.service';
import { Plants } from '@productsHome/products/products.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  plants: Plants[] = [];

  constructor(private productsResponse: ProductsService) {}

  fetchData() {
    this.productsResponse.getAllProducts().subscribe((value) => {
      value.map((item) => {
        this.plants.push({
          name: item.name,
          img: item.extraInfo.image[0],
          price: item.price,
          id: item.id,
        });
      });
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}