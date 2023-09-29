import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plant } from '@sharedModule/services/entities/types/product.interface';
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() plant: Plant;
  @Output() addToCart = new EventEmitter();

  plantParams = {
    size: '',
    coeff: 1,
    potColor: '',
  };

  constructor(private tippyService: NgxTippyService) {}

  ngOnInit(): void {
    this.plantParams.size = this.plant.size[0].size;
    this.plantParams.coeff = this.plant.size[0].coeff;
    this.plantParams.potColor = this.plant.potColor[0];
  }
}
