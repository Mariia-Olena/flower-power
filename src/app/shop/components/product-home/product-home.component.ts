import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { ProductsService } from '@services/products.service';
import { Plant } from '@productHome/product/types/plant.interface';
import { PlantCard } from '@shop/products-home/components/products/types/plant.interface';
import { PlantInfo } from '@productHome/product-info/types/plant-info.interface';
import { PlantReview } from '@productHome//product-review/types/plant-review.interface';
import { APIproduct, Product } from '@interfaces/product-plant.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';

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

  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  private product: Product;

  limit: number = 7;
  currentPage: number = 1;
  sort: string = '-price'

  constructor(
    private productsService: ProductsService,
    private cartV2Service: CartV2Service,
    private route: ActivatedRoute,
  ) {}

  fetchProduct() {
    this.route.params.subscribe(({ id }) => {
      this.product$ = this.productsService.getProduct(id).pipe(
        tap((value: APIproduct) => {
          this.product = value;
        })
      );
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
          id: value.id,
          isInCart: (): boolean => {
            return !!this.cartV2Service.isInCart(value.id);
          },
          count: () => this.cartV2Service.getCount(value.id) || 1,
          counterChange: (count: number): void => {
            this.cartV2Service.changeCount(value.id, count)
          }
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

  fetchPlants() {
    this.products$ = this.productsService.getAllProducts(
      this.limit,
      this.currentPage,
      this.sort
    );

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

  addToCart() {
    this.cartV2Service.addProduct(this.product);
  }

  ngOnInit(): void {
    this.fetchProduct();
    this.fetchPlants();
  }
}
