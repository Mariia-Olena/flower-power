import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '@sharedModule/services/entities/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  filters = [
    { benefit: ['Air Purifier', 'Easy Care', 'Pet Friendly'] },
    { light: ['Low Light', 'Bright Light'] },
    {
      size: [
        'Mini (2”-3” Pot)',
        'Small (4” Pot)',
        'Medium (6” Pot)',
        'Large (8”-10” Pot)',
      ],
    },
    {
      type: [
        'Air Plant',
        'Aquatic Plant',
        'Bundle',
        'Faux Plant',
        'Gift and Decor',
      ],
    },
    { sale: ['Discounted Items'] },
  ];

  selectedFilters = this.productsService.selectedFilters

  checkFilter(name: string) {
    this.productsService.checkFilter(name)
  }

  ngOnInit(): void {}
}
