import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PlantCard } from '@productsPage/products/types/plant.interface';
import { APIproduct } from '@interfaces/product-plant.interface';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  limit: number = 7;
  currentPage: number = 1;
  sort: string = 'price';
  filter: string = '';

  constructor(
    private productsMapper: ProductsMapper,
    private productsService: ProductsService
  ) {}

  setPlants(limit: number, currentPage: number, sort: string, filter: string) {
    this.products$ = this.productsService.getAllProducts(
      limit,
      currentPage,
      sort,
      filter
    );

    this.plants$ = this.products$.pipe(
      map((value) => this.productsMapper.mapPlants(value))
    );
  }

  ngOnInit(): void {
    this.setPlants(this.limit, this.currentPage, this.sort, this.filter);
  }
}
