import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() item: {
    name: string;
    value: string;
  }
  
  @Output() confirmation = new EventEmitter<boolean>();

  blockScroll() {
    document.body.style.overflow = 'hidden';
  }

  handleBackgroundClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.confirmation.emit(false)
    }
  }

  ngOnInit(): void {
    this.blockScroll();
  }
}
