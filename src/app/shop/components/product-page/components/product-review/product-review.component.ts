import { Component, Input } from '@angular/core';
import { ProductReview } from '@sharedModule/services/entities/types/product.interface';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent {
  @Input() plantReview: ProductReview[] = [];
}
