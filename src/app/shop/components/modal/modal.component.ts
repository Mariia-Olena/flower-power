import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@sharedModule/services/entities/orders.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(public ordersService: OrdersService) {}

  blockScroll() {
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.ordersService.showModal.next(false);
  }

  ngOnInit(): void {
    this.blockScroll();
  }
}
