import { Component, Input } from '@angular/core';

export interface PlantInfo {
  name: string;
  video: string;
  plantCare: {
    light: string;
    watering: string;
    care: string;
  };
}

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent {
  @Input() plantInfo: PlantInfo = {
    name: '',
    video: '',
    plantCare: {
      light: '',
      watering: '',
      care: '',
    },
  };
}
