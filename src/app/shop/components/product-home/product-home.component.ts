import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { ProductsService } from '@services/products.service';
import { Plant } from '@productHome/product/types/plant.interface';
import { PlantInfo } from '@productHome/product-info/types/plant-info.interface';
import { PlantReview } from '@productHome//product-review/types/plant-review.interface';
import { APIproduct } from '@interfaces/product-plant.interface';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  plant$: Observable<Plant>;
  plantInfo$: Observable<PlantInfo>;
  plantReview$: Observable<PlantReview[]>;
  product$: Observable<APIproduct>;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  fetchProduct() {
    this.route.params.subscribe(({ id }) => {
      this.product$ = this.productsService.getProduct(id);
      console.log(this.product$);
    });

    this.fetchPlant();
    this.fetchPlantInfo();
    this.fetchPlantReview();
  }

  fetchPlant() {
    this.plant$ = this.product$.pipe(
      map((value: APIproduct): Plant => {
        return {
          slides: value.extraInfo.image.map((item: string) => {
            return { img: item };
          }),
          name: value.name,
          price: value.price,
          size: value.extraInfo.size,
          potColor: value.extraInfo.potColor,
        };
      })
    );
  }

  fetchPlantInfo() {
    this.plantInfo$ = this.product$.pipe(
      map((value: APIproduct): PlantInfo => {
        return {
          name: value.name,
          video: value.extraInfo.video,
          plantCare: {
            light: value.extraInfo.plantCare.light,
            watering: value.extraInfo.plantCare.watering,
            care: value.extraInfo.plantCare.care,
          },
        };
      })
    );
  }

  fetchPlantReview() {
    this.plantReview$ = this.product$.pipe(
      map((value: APIproduct): PlantReview[] => {
        return [...value.extraInfo.review];
      })
    );
  }

  ngOnInit(): void {
    this.fetchProduct();
  }
}
