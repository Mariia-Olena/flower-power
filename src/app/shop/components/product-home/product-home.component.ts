import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { Plant } from '@productHome/product/product.component';
import { PlantInfo } from '@productHome/product-info/product-info.component';
import { PlantReview } from '@productHome/product-review/product-review.component';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  plant: Plant;

  plantInfo: PlantInfo;

  plantReview: PlantReview[];

  constructor(private ProductResponse: ProductsService) {}

  fetchData() {
    this.ProductResponse.getProduct().subscribe((value) => {
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
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
