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
      iconLink: 'assets/icons/tick.svg',
    },
    {
      name: 'plant care',
      link: '',
      iconLink: 'assets/icons/tick.svg',
    },
    {
      name: 'contact us',
      link: '',
      iconLink: 'assets/icons/tick.svg',
    },
    {
      name: 'business gifting',
      link: '',
      iconLink: 'assets/icons/tick.svg',
    },
  ];

  toolBar = [
    {
      name: 'log in',
      link: '',
      iconLink: 'assets/icons/log_in.svg',
    },
    {
      name: 'search',
      link: '',
      iconLink: 'assets/icons/search.svg',
    },
    {
      name: 'cart',
      link: '',
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
    {
      name: 'calathea lietzei',
      price: '13.99',
      img: 'assets/plants/image_64.png',
    },
  ];
}
