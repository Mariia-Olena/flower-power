import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@sharedModule/services/products.service';
import { Plant } from '@productsHome/products/products.component';
import {APIproduct} from "@interfaces/product-plant.interface";
import {map, Observable, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  plants: Plant[] = [];
  products$: Observable<APIproduct[]>;
  plants$: Observable<Plant[]>;
  total$: Observable<number>;
  prodSubsc: Subscription;

  constructor(private productsResponse: ProductsService) {}

  fetchData() {
    this.prodSubsc = this.productsResponse.getAllProducts().subscribe((value) => {

      if(!environment.production) {
        console.log(value);
      }

      this.plants = value.map((item: APIproduct): Plant => {
        return {
          name: item.name,
          img: item.extraInfo.image[0],
          price: item.price,
          id: item.id,
        };
      });
    });

    this.products$ = this.productsResponse.getAllProducts();

    // this.plants$ = this.productsResponse.getAllProducts()
    this.plants$ = this.products$
      .pipe(
        map((res: APIproduct[]): Plant[] => {
          return res.map((item: APIproduct): Plant => {
            return {
              name: item.name,
              img: item.extraInfo.image[0],
              price: item.price,
              id: item.id,
            };
          })
        }),
      );

    this.total$ = this.plants$
      .pipe(
        map((res: Plant[]): number => {
          return res.reduce((acc: number, item: Plant): number => item.price + acc, 0)
        }),
      );

  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.prodSubsc.unsubscribe();
  }
}
