import { Component, Input } from '@angular/core';
import { PlantReview } from './types/plant-review.interface';


@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent {
  @Input() plantReview: PlantReview[] = [];
}
