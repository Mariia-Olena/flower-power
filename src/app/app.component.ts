import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navBar = [
    {
      name: 'shop',
      link: '',
    },
    {
      name: 'plant care',
      link: '',
    },
    {
      name: 'contact us',
      link: '',
    },
    {
      name: 'business gifting',
      link: '',
    },
  ];

  toolBar = [
    {
      name: 'log in',
      iconLink: 'assets/icons/log_in.svg',
    },
    {
      name: 'search',
      iconLink: 'assets/icons/search.svg',
    },
    {
      name: 'cart',
      iconLink: 'assets/icons/cart.svg',
    },
  ];

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
  ];
}