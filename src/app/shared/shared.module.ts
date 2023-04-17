import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
  ],
  exports: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    SliderComponent,
  ],
})
export class SharedModule {}
