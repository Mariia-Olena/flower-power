import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductsService } from '@sharedModule/services/products.service';
import { PlantCard } from '@productsHome/products/types/plant.interface';
import { APIproduct } from '@interfaces/product-plant.interface';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  constructor(private productsService: ProductsService) {}

  fetchPlants() {
    this.products$ = this.productsService.getAllProducts();

    this.plants$ = this.products$.pipe(
      map((res: APIproduct[]): PlantCard[] => {
        return res.map((item: APIproduct): PlantCard => {
          return {
            name: item.name,
            img: item.extraInfo.image[0],
            price: item.price,
            id: item.id,
          };
        });
      })
    );
  }

  ngOnInit(): void {
    this.fetchPlants();
  }
}
