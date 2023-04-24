import { Component, Input, OnInit } from '@angular/core';
import { PlantCard } from './types/plant.interface';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() plants: PlantCard[] = [];

  ngOnInit(): void {}
}
