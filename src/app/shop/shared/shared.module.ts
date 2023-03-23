import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [CounterComponent, PaginationComponent, RatingComponent],
  imports: [CommonModule],
  exports: [CounterComponent, PaginationComponent, RatingComponent],
})
export class SharedModule {}
