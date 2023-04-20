import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../products/products.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() plant: Plant;

  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  constructor(private activateRoute: ActivatedRoute) {
    activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log(this.plant);
  }
}
