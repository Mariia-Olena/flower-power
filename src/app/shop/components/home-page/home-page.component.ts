import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductsService } from '@sharedModule/services/products.service';
import { PlantCard } from '@productsHome/products/types/plant.interface';
import { APIproduct } from '@interfaces/product-plant.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  info = [
    {
      title: 'Plant lexicon',
      text: 'References',
      button: 'open the dictionary',
      img: 'https://images.unsplash.com/photo-1588326709132-2d4091ea8822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=757&q=80',
    },
    {
      title: 'Plant doctor',
      text: 'plant questions?',
      button: 'contact doctor',
      img: 'https://images.unsplash.com/photo-1596364725424-7673f05f64b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    {
      title: 'Plant blog',
      text: 'tips&tricks',
      button: 'discover blog',
      img: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1491&q=80',
    }
  ];

  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  limit: number = 7;
  currentPage: number = 1;
  sort: string = '-price';

  constructor(private productsService: ProductsService) {}

  fetchPlants() {
    this.products$ = this.productsService.getAllProducts(
      this.limit,
      this.currentPage,
      this.sort
    );

    this.plants$ = this.products$.pipe(
      map((res: APIproduct[]): PlantCard[] => {
        return res.map((item: APIproduct): PlantCard => {
          return {
            name: item.name,
            img: item.extraInfo.image[0],
            price: item.price,
            id: item.id,
          };
        });
      })
    );
  }

  ngOnInit(): void {
    this.fetchPlants();
  }
}
