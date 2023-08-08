import { Component, Input } from '@angular/core';
import { PlantCard } from '@productsPage/products/types/plant.interface';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent {
  @Input() plants: PlantCard[];
}
