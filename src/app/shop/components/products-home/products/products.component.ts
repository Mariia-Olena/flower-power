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
      name: 'zamioculcas',
      price: '23.00',
      img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
    },
    {
      name: 'peace lily',
      price: '26.00',
      img: 'https://images.unsplash.com/photo-1620311497344-bce841c9c060?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    },
    {
      name: 'alocasia dragon scale',
      price: '20.00',
      img: 'https://images.unsplash.com/photo-1617693322135-13831d116f79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    },
    {
      name: 'alocasia cucullata',
      price: '25.00',
      img: 'https://images.unsplash.com/photo-1616500443036-788d60118813?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    },
    {
      name: 'monstera',
      price: '30.00',
      img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'pilea peperomioides',
      price: '19.00',
      img: 'https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'alocasia macrorrhiza',
      price: '22.00',
      img: 'https://images.unsplash.com/photo-1610630694586-2af2f4cefcf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'anthurium scherzerianum',
      price: '21.00',
      img: 'https://images.unsplash.com/photo-1610354745731-33642d488abb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    },
    {
      name: 'golden pothos',
      price: '25.00',
      img: 'https://images.unsplash.com/photo-1600411833114-bd695886396e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'christmas tree',
      price: '15.00',
      img: 'https://images.unsplash.com/photo-1667565916475-df77c3fe2a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'philodendron pink princess',
      price: '17.00',
      img: 'https://images.unsplash.com/photo-1662457476478-c92b302d6169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'philodendron birkin white measure',
      price: '26.00',
      img: 'https://images.unsplash.com/photo-1661875874991-128b40107d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'agalonema amazon silver',
      price: '40.00',
      img: 'https://images.unsplash.com/photo-1661875874983-9f8c24c19bc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'set of babyplants',
      price: '15.00',
      img: 'https://images.unsplash.com/photo-1659592986779-1a47f29ba48f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'bonsai fabian',
      price: '39.00',
      img: 'https://images.unsplash.com/photo-1659592986840-9664ee656f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    {
      name: 'schefflera plant',
      price: '31.00',
      img: 'https://images.unsplash.com/photo-1659348447568-d0de3cb5a872?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
  ];

  ngOnInit(): void {}
}
