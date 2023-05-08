import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { CounterComponent } from '@shared/counter/counter.component';
import { PaginationComponent } from '@shared/pagination/pagination.component';
import { RatingComponent } from '@shared/rating/rating.component';
import { SliderComponent } from '@shared/slider/slider.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    SliderComponent,
    TooltipComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxTippyModule
  ],
  exports: [
    CounterComponent,
    PaginationComponent,
    RatingComponent,
    SliderComponent,
    SafeUrlPipe
  ],
})
export class SharedModule {}
