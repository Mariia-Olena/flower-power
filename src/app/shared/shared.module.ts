import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { CounterComponent } from '@shared/counter/counter.component';
import { PaginationComponent } from '@shared/pagination/pagination.component';
import { RatingComponent } from '@shared/rating/rating.component';
import { SliderComponent } from '@shared/slider/slider.component';

@NgModule({
  declarations: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    SliderComponent,
  ],
  imports: [CommonModule, SlickCarouselModule, ReactiveFormsModule],
  exports: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    SliderComponent,
  ],
})
export class SharedModule {}
