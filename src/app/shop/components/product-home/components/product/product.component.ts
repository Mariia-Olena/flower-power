import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '@sharedModule/services/cart.service';
import { Plant } from './types/plant.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  @Input() plant: Plant;
  @Output() addToCart: EventEmitter<{ count: number }> = new EventEmitter();

  addProductToCart() {
    this.addToCart.emit({ 
      count: this.counterForm.controls['quantity'].value 
    });
  }

  ngOnInit(): void {}
}
