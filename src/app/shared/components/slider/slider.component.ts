import {
  Component,
  ViewChild,
  OnInit,
  Input,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() slides: any[] = [];
  @Input() sliderType = '';
  @Input() slideTemplate: TemplateRef<ElementRef<HTMLElement>> | undefined;
  @Input() options = {};
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  slideConfig = {};

  addSliderConfig(): {} {
    if (this.sliderType === 'singleItem') {
      return {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        ...this.options,
      };
    }

    if (this.sliderType === 'centerMode') {
      return {
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '150px',
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 3,
              centerPadding: '100px',
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              centerPadding: '100px',
            },
          },
        ],
        ...this.options,
      };
    }

    if (this.sliderType === 'multipleItems') {
      return {
        slidesToShow: 3,
        slidesToScroll: 3,
        centerPadding: '150px',
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 3,
              centerPadding: '100px',
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              centerPadding: '100px',
            },
          },
        ],
        ...this.options,
      };
    }

    return { ...this.options };
  }

  slickInit(e: any) {}

  breakpoint(e: any) {}

  afterChange(e: any) {}

  beforeChange(e: any) {}

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  ngOnInit(): void {
    this.slideConfig = this.addSliderConfig();
  }
}
