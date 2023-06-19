import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() limit: number = 0;
  @Input() total: number = 0;

  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];
  pagesToShow(): number[] {
    const currentIndex = this.pages.findIndex(
      (item) => item === this.currentPage
    );
    
    if (currentIndex === 0 || currentIndex === 1) {
      const pages = this.pages.slice(0, 3);
      pages.push(this.pages.length);
      return pages;
    }

    if (currentIndex === this.pages.length - 1 || currentIndex === this.pages.length - 2) {
      const pages = this.pages.slice(this.pages.length - 3);
      pages.unshift(1);
      return pages;
    }

    if (1 < currentIndex && currentIndex < this.pages.length - 2) {
      const pages = this.pages.slice(currentIndex - 1, currentIndex + 2);
      pages.unshift(1);
      pages.push(this.pages.length);
      return pages;
    }

    return this.pages;
  }

  constructor() {}

  range(): number[] {
    const pagesCount = Math.ceil(this.total / this.limit);

    return [...Array(pagesCount).keys()].map((elem) => elem + 1);
  }

  ngOnInit(): void {
    this.pages = this.range();
    this.pagesToShow();
  }
}
