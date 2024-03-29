import { Component, Input, OnInit } from '@angular/core';
import { PlantInfo } from '@sharedModule/services/entities/types/product.interface';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() plantInfo: PlantInfo;

  ngOnInit(): void {}
}
