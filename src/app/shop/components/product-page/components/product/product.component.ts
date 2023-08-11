import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plant } from '@sharedModule/services/entities/types/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() plant: Plant;
  @Output() addToCart = new EventEmitter();

  ngOnInit(): void {}
}
