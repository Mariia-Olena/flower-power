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
import { ProductMapper } from '@sharedModule/mappers/product.mapper';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  plantCard: Plant;
  plantInfo$: Observable<PlantInfo>;
  plantReview$: Observable<PlantReview[]>;
  plants$: BehaviorSubject<PlantCard[]>;

  limit: number = 9;
  currentPage: number = 1;
  sort: string = '-name';

  constructor(
    private route: ActivatedRoute,
    private cartV2Service: CartV2Service,
    private productMapper: ProductMapper,
    private productsMapper: ProductsMapper
  ) {}

  addToCart() {
    this.cartV2Service.addProduct(this.productMapper.product);
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.productMapper.setPlant(id);
    });

    this.productMapper.setPlantCard().subscribe((value) => {
      this.plantCard = value;
    });
    this.plantInfo$ = this.productMapper.setPlantInfo();
    this.plantReview$ = this.productMapper.plantReview$;
    this.plants$ = this.productsMapper.setPlants(
      this.limit,
      this.currentPage,
      this.sort
    );    
  }
}
