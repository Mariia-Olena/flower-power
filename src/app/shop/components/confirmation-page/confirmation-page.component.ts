import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import { StorageService } from '@sharedModule/services/storage.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {
  id: string;

  constructor(
    private ordersService: OrdersService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.id = this.ordersService.getCurrentOrder().id;
  }

  ngOnDestroy(): void {
    this.ordersService.resetCurrentOrder();
    this.storage.remove('order');
  }
}
