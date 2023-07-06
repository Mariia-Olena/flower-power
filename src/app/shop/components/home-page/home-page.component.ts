import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlantCard } from '@productsHome/products/types/plant.interface';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  plants$: BehaviorSubject<PlantCard[]>;

  limit: number = 7;
  currentPage: number = 1;
  sort: string = 'price';

  constructor(private ProductsMapper: ProductsMapper) {}

  ngOnInit(): void {
    this.plants$ = this.ProductsMapper.setPlants(this.limit, this.currentPage, this.sort);
  }
}
