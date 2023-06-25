import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() limit: number = 0;
  @Input() total: number = 0;

  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];
  pagesCount: number = 1;

  pagesToShow(): number[] {
    const currentIndex = this.pages.findIndex(
      (item) => item === this.currentPage
    );

    if (this.pagesCount < 6) {
      return this.pages;
    }

    if (currentIndex === 0 || currentIndex === 1) {
      const pages = this.pages.slice(0, 3);
      return pages;
    }

    if (1 < currentIndex && currentIndex < this.pagesCount - 2) {
      const pages = this.pages.slice(currentIndex - 1, currentIndex + 2);
      return pages;
    }

    if (currentIndex === this.pagesCount - 1 || currentIndex === this.pagesCount - 2) {
      const pages = this.pages.slice(this.pagesCount - 3);
      return pages;
    }

    return this.pages;
  }

  constructor() {}

  range(): number[] {
    this.pagesCount = Math.ceil(this.total / this.limit);

    return [...Array(this.pagesCount).keys()].map((elem) => elem + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = this.range();
    this.pagesToShow();
  }
}
