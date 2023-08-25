import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() item: string;
  @Output() confirmation = new EventEmitter<boolean>();

  blockScroll() {
    document.body.style.overflow = 'hidden';
  }

  ngOnInit(): void {
    this.blockScroll();
  }
}
