import { Component, OnInit } from '@angular/core';
import { NgxTippyService } from 'ngx-tippy-wrapper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor( private tippyService: NgxTippyService) {}

  navBar = [
    {
      name: 'shop',
      link: 'products',
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

  ngOnInit() {
    this.tippyService.setDefaultProps({
      popperOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 180]
            },
          },
        ],
      },
    });
  }
}
