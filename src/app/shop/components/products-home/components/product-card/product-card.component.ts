import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlantCard } from '../products/types/plant.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() plant: PlantCard;

  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  ngOnInit(): void {
  }
}
