import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import {
  APIproduct,
  ProductAdmin,
} from '@sharedModule/services/entities/types/product.interface';
import { AddEditComponent } from '../add-edit.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent extends AddEditComponent<
  APIproduct,
  ProductAdmin
> {
  form = new FormGroup({
    name: new FormControl('', []),
    price: new FormControl('', []),
    description: new FormControl('', []),
    extraInfo: new FormGroup({
      image: new FormArray([]),
      size: new FormArray([]),
      potColor: new FormArray([]),
      rating: new FormControl('', []),
      video: new FormControl('', []),
      plantCare: new FormGroup({
        watering: new FormGroup({
          title: new FormControl('', []),
          text: new FormControl('', []),
        }),
        light: new FormGroup({
          title: new FormControl('', []),
          text: new FormControl('', []),
        }),
        care: new FormGroup({
          title: new FormControl('', []),
          text: new FormControl('', []),
        }),
      }),
      review: new FormArray([]),
    }),
  });

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    super(productsService, route);
  }

  get image() {
    return this.form.controls.extraInfo.controls['image'] as FormArray;
  }

  get size() {
    return this.form.controls.extraInfo.controls['size'] as FormArray;
  }

  get potColor() {
    return this.form.controls.extraInfo.controls['potColor'] as FormArray;
  }

  get review() {
    return this.form.controls.extraInfo.controls['review'] as FormArray;
  }

  addImage() {
    const imageForm = new FormGroup({
      imageUrl: new FormControl('', []),
    });

    this.image.push(imageForm);
  }

  addSize() {
    const sizeForm = new FormGroup({
      size: new FormControl('', []),
      coeff: new FormControl('', []),
    });

    this.size.push(sizeForm);
  }

  addPotColor() {
    const potColorForm = new FormGroup({
      potColor: new FormControl('', []),
    });

    this.potColor.push(potColorForm);
  }

  addReview() {
    const reviewForm = new FormGroup({
      name: new FormControl('', []),
      rating: new FormControl('', []),
      comment: new FormControl('', []),
      photo: new FormControl('', []),
    });

    this.review.push(reviewForm);
  }

  setFieldsUpfront(item?: APIproduct): void {
    if (!item) {
      this.addImage()
      this.addSize()
      this.addPotColor()
      this.addReview()
      return
    }

    if(item && item.extraInfo) {
      item.extraInfo.image.forEach(item => this.addImage())
      item.extraInfo.size.forEach(item => this.addSize())
      item.extraInfo.potColor.forEach(item => this.addPotColor())
      item.extraInfo.review.forEach(item => this.addReview())
    }
  }

  setValueInForm(): void {
    this.form.controls.name.patchValue(this.item.name);
    this.form.controls.price.patchValue(this.item.price.toString());
    this.form.controls.description.patchValue(this.item.description);
    this.form.controls.extraInfo.controls.rating.patchValue(this.item.extraInfo.rating.toString());
    this.form.controls.extraInfo.controls.video.patchValue(this.item.extraInfo.video);
    this.image.patchValue(this.setValueInFormArray(this.item.extraInfo.image, 'imageUrl'));
    this.potColor.patchValue(this.setValueInFormArray(this.item.extraInfo.potColor, 'potColor'));
    this.form.controls.extraInfo.controls.plantCare.controls.watering.patchValue(this.item.extraInfo.plantCare.watering);
    this.form.controls.extraInfo.controls.plantCare.controls.light.patchValue(this.item.extraInfo.plantCare.light);
    this.form.controls.extraInfo.controls.plantCare.controls.care.patchValue(this.item.extraInfo.plantCare.care);
    this.size.patchValue(this.item.extraInfo.size);
    this.review.patchValue(this.item.extraInfo.review);
  }

}
