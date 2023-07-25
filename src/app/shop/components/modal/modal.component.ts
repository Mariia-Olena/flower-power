import { Component, OnInit } from '@angular/core';
import { OrderService } from '@sharedModule/services/order.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(public orderService: OrderService) {}

  blockScroll() {
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.orderService.showModal.next(false);
  }

  ngOnInit(): void {
    this.blockScroll();
  }
}
