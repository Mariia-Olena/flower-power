import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import {
  APIproduct,
  Product,
} from '@sharedModule/services/entities/types/product.interface';
import { AddEditComponent } from '../add-edit.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent extends AddEditComponent<
  APIproduct,
  Product
> {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(999999),
      Validators.pattern(/^[1-9]\d*\.\d{2}$/),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
    ]),
    extraInfo: new FormGroup({
      image: new FormArray([]),
      size: new FormArray([]),
      potColor: new FormArray([]),
      rating: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
        Validators.pattern(/^[0-9.]+$/),
      ]),
      video: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https:\/\/www\.youtube\.com\/.*/),
      ]),
      plantCare: new FormGroup({
        watering: new FormGroup({
          title: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
          text: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
        }),
        light: new FormGroup({
          title: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
          text: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
        }),
        care: new FormGroup({
          title: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
          text: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
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
      imageUrl: new FormControl('', [Validators.required]),
    });

    this.image.push(imageForm);
  }

  addSize() {
    const sizeForm = new FormGroup({
      size: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9-]+$/),
      ]),
      coeff: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9.]+$/),
      ]),
    });

    this.size.push(sizeForm);
  }

  addPotColor() {
    const potColorForm = new FormGroup({
      potColor: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
    });

    this.potColor.push(potColorForm);
  }

  addReview() {
    const reviewForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      rating: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
        Validators.pattern(/^[0-9.]+$/),
      ]),
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      photo: new FormControl('', []),
    });

    this.review.push(reviewForm);
  }

  setFieldsUpfront(item?: APIproduct): void {
    if (!item) {
      this.addImage();
      this.addSize();
      this.addPotColor();
      this.addReview();
      return;
    }

    if (item && item.extraInfo) {
      item.extraInfo.image.forEach((item) => this.addImage());
      item.extraInfo.size.forEach((item) => this.addSize());
      item.extraInfo.potColor.forEach((item) => this.addPotColor());
      item.extraInfo.review.forEach((item) => this.addReview());
    }
  }

  setValueInForm(): void {
    this.form.controls.name.patchValue(this.item.name);
    this.form.controls.price.patchValue(this.item.price.toString());
    this.form.controls.description.patchValue(this.item.description);
    this.form.controls.extraInfo.controls.rating.patchValue(
      this.item.extraInfo.rating.toString()
    );
    this.form.controls.extraInfo.controls.video.patchValue(
      this.item.extraInfo.video
    );
    this.image.patchValue(
      this.setValueInFormArray(this.item.extraInfo.image, 'imageUrl')
    );
    this.potColor.patchValue(
      this.setValueInFormArray(this.item.extraInfo.potColor, 'potColor')
    );
    this.form.controls.extraInfo.controls.plantCare.controls.watering.patchValue(
      this.item.extraInfo.plantCare.watering
    );
    this.form.controls.extraInfo.controls.plantCare.controls.light.patchValue(
      this.item.extraInfo.plantCare.light
    );
    this.form.controls.extraInfo.controls.plantCare.controls.care.patchValue(
      this.item.extraInfo.plantCare.care
    );
    this.size.patchValue(this.item.extraInfo.size);
    this.review.patchValue(this.item.extraInfo.review);
  }

  transformFormValue(formValue): Product {
    let { name, price, description, extraInfo } = formValue;

    price = +price;
    extraInfo.rating = +extraInfo.rating;

    extraInfo.review.forEach((item, index) => {
      extraInfo.review[index].rating = +item.rating;
    });

    extraInfo.size.forEach((item, index) => {
      extraInfo.size[index].coeff = +item.coeff;
    });

    extraInfo.image.forEach((item, index) => {
      extraInfo.image[index] = item.imageUrl;
    });

    extraInfo.potColor.forEach((item, index) => {
      extraInfo.potColor[index] = item.potColor;
    });

    return {
      name,
      price,
      description,
      extraInfo,
    };
  }
}
