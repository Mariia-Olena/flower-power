import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PlantCard } from '@sharedModule/services/entities/types/product.interface';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import { ParamsHttp } from '@sharedModule/types/based-crud-http-service.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  params: ParamsHttp = {
    limit: 7,
    page: 1,
    sort: 'price',
    filter: [],
  };

  constructor(
    private productsMapper: ProductsMapper,
    private productsService: ProductsService
  ) {}

  setPlants(params: ParamsHttp) {
    this.products$ = this.productsService.getAll(this.params);

    this.plants$ = this.products$.pipe(
      map((value) => this.productsMapper.mapPlants(value))
    );
  }

  ngOnInit(): void {
    this.setPlants(this.params);
  }
}
