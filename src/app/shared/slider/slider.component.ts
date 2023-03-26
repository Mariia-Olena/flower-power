import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() slides: { url: string }[] = [];

  currentIndex = 0;

  constructor() {}

  getCurrentSlideUrl(): string {
    return `${this.slides[this.currentIndex].url}`;
  }

  changeImg(index: number): void {
    this.currentIndex = index;
  }

  toNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    this.currentIndex = isLastSlide ? 0 : this.currentIndex + 1;
  }

  toPrev(): void {
    const isFirsSlide = this.currentIndex === 0;
    this.currentIndex = isFirsSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;
  }

  ngOnInit(): void {}
}
