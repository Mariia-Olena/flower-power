import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { Plant } from '@productHome/product/product.component';
import { PlantInfo } from '@productHome/product-info/product-info.component';
import { PlantReview } from '@productHome/product-review/product-review.component';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  plant: Plant;

  plantInfo: PlantInfo;

  plantReview: PlantReview[];

  // ololo =this.productsService.getProduct();
  //
  // plant$ = this.ololo.pipe(
  //   map()
  // );

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  fetchData() {
    this.route.params.subscribe(({ id }) => {

      this.productsService.getProduct(id).subscribe((value) => {
        this.plant = {
          slides: value.extraInfo.image.map((item: string) => {
            return { img: item };
          }),
          name: value.name,
          price: value.price,
          size: value.extraInfo.size,
          potType: value.extraInfo.potType,
        };

        this.plantInfo = {
          name: value.name,
          video: value.extraInfo.video,
          plantCare: {
            light: value.extraInfo.plantCare.light,
            watering: value.extraInfo.plantCare.watering,
            care: value.extraInfo.plantCare.care,
          },
        };

        this.plantReview = [...value.extraInfo.review];
      });

    })




  }

  ngOnInit(): void {
    this.fetchData();
  }
}
