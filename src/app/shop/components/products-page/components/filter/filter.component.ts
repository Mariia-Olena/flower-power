import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  filters = [
    { benefit: ['Air Purifier', 'Easy Care', 'Pet Friendly'] },
    { light: ['Low Light', 'Bright Light'] },
    { size: ['Mini (2”-3” Pot)', 'Small (4” Pot)', 'Medium (6” Pot)', 'Large (8”-10” Pot)'] },
    { type: ['Air Plant', 'Aquatic Plant', 'Bundle', 'Faux Plant', 'Gift and Decor'] },
    { sale: ['Discounted Items'] },
  ];

  ngOnInit(): void {}
}
