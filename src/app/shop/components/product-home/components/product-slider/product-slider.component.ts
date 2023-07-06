import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { PlantCard } from '@shop/products-home/components/products/types/plant.interface';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent {
  @Input() plants: PlantCard[];
}
