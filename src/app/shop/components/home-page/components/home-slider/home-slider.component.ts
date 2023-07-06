import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlantCard } from '@shop/products-home/components/products/types/plant.interface';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent {
  @Input() plants: PlantCard[];
  @Output() addToCart = new EventEmitter();

  slides = [
    {
      name: 'large 8-10 inch plants',
      img: [
        'https://images.unsplash.com/photo-1600958568384-51f4289e943a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        'https://images.unsplash.com/photo-1630565945904-7e4220cadd0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      ],
      text: 'The perfect option to liven up your home!'
    },
    {
      name: 'Complete guide to humidity',
      img: [
        'https://images.unsplash.com/photo-1599719839704-0092318dd800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
        'https://images.unsplash.com/photo-1598880940371-c756e015fea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      ],
      text: 'Most indoor plants like moist air as well as moist soil. Here\'s how to keep your plants humid and happy.'
    },
    {
      name: 'Indoor Cactus Plants',
      img: [
        'https://images.unsplash.com/photo-1618470070854-68bb8a335942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
        'https://images.unsplash.com/photo-1619446477695-5c4e31d15009?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      ],
      text: 'Whether you\'re channeling a boho vibe or just prefer plants that can handle a bit of neglect, there\'s a cactus for you.'
    },
    {
      name: 'Flowering peace lily',
      img: [
        'https://images.unsplash.com/photo-1610354559669-f32fe0707a60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
        'https://images.unsplash.com/photo-1685430488624-e5971910cba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80'
      ],
      text: 'Keep your peace lily looking effortlessly elegant, whether you\'re an experienced plant parent or new kid on the block.'
    },
    {
      name: 'Tiny plants',
      img: [
        'https://images.unsplash.com/photo-1688367709316-bca67bededfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
        'https://images.unsplash.com/photo-1688366976870-ee8d29f5e121?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      ],
      text: 'If you\'re new to houseplants, or if you\'re looking for a thoughtful gift, succulents are a great choice. They don\'t need much looking after and look gorgeous on their own or as part of a bigger collection. '
    },
  ];
}
