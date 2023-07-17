import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '@sharedModule/services/order.service';
import { StorageService } from '@sharedModule/services/storage.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {
  id: string;

  constructor(
    private orderService: OrderService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.id = this.orderService.getCurrentOrder().id;
  }

  ngOnDestroy(): void {
    this.orderService.resetCurrentOrder();
    this.storage.remove('order');
  }
}
