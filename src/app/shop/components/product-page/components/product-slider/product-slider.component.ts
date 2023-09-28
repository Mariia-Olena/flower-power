import { Component, Input } from '@angular/core';
import { PlantCard } from '@sharedModule/services/entities/types/product.interface';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent {
  @Input() plants: PlantCard[];
}
