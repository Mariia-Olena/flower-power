import { Component, Input } from '@angular/core';

export interface PlantReview {
  name: string;
  rating: number;
  comment: string;
  photo: string;
}

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent {
  @Input() plantReview: PlantReview[] = [];
}
