import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {} from '@angular/core';
import { PlantCard } from './types/plant.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() plants: PlantCard[] = [];
  @Output() addToCart = new EventEmitter<string>();

  ngOnInit(): void {}
}
