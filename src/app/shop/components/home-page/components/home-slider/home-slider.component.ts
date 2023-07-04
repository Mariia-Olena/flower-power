import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { PlantCard } from '@shop/products-home/components/products/types/plant.interface';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent {
  @Input() plants: PlantCard[];
  @Output() addToCart = new EventEmitter();
}
