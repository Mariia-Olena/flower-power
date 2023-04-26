import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import { CounterComponent } from '@shared/counter/counter.component';
import { PaginationComponent } from '@shared/pagination/pagination.component';
import { RatingComponent } from '@shared/rating/rating.component';
import { SliderComponent } from '@shared/slider/slider.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    SliderComponent,
    TooltipComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    TooltipModule.forRoot()
  ],
  exports: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    SliderComponent,
  ],
})
export class SharedModule {}
