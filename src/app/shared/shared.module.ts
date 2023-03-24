import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RatingComponent } from './rating/rating.component';
import { ButtonDirective } from './button/button.directive';
import { SliderComponent } from './slider/slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    ButtonDirective,
    SliderComponent,
  ],
  imports: [CommonModule, SlickCarouselModule],
  exports: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    ButtonDirective,
  ],
})
export class SharedModule {}
