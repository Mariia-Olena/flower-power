import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
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
}
