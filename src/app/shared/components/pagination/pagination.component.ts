import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() limit: number;
  @Input() total: number;

  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  constructor() {}

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map(elem => elem + start)
  }

  ngOnInit(): void {
    const pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1, 5)
  }
}
