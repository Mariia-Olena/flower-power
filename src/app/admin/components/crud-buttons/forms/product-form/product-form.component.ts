import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm = new FormGroup({
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

  get image() {
    return this.productForm.controls.extraInfo.controls['image'] as FormArray;
  }

  get size() {
    return this.productForm.controls.extraInfo.controls['size'] as FormArray;
  }

  get potColor() {
    return this.productForm.controls.extraInfo.controls[
      'potColor'
    ] as FormArray;
  }

  get review() {
    return this.productForm.controls.extraInfo.controls['review'] as FormArray;
  }

  delete(controlName: string, index: number) {
    this[controlName].removeAt(index);
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

}
