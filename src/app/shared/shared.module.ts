import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RatingComponent } from './rating/rating.component';
import { ButtonDirective } from './button/button.directive';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    ButtonDirective,
    SliderComponent,
  ],
  imports: [CommonModule],
  exports: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    ButtonDirective,
    SliderComponent,
  ],
})
export class SharedModule {}
