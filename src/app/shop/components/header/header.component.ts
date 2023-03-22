import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

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

  ngOnInit(): void {}
}
