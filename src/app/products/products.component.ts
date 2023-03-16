import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor() {}

  plants = [
    {
      name: 'pilea peperomioides',
      price: '36.99',
      img: 'assets/plants/image_60.png',
    },
    {
      name: 'scindapsus pictus',
      price: '18.99',
      img: 'assets/plants/image_105.png',
    },
    {
      name: 'peace lily plant',
      price: '29.99',
      img: 'assets/plants/image_126.png',
    },
    {
      name: 'monstera plant',
      price: '42.99',
      img: 'assets/plants/image_58.png',
    },
    {
      name: 'calathea lietzei',
      price: '13.99',
      img: 'assets/plants/image_64.png',
    },
  ];

  ngOnInit(): void {}
}
