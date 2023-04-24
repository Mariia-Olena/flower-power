import { Component, Input, OnInit } from '@angular/core';
import { PlantInfo } from './types/plant-info.interface';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent {
  @Input() plantInfo: PlantInfo;
}
