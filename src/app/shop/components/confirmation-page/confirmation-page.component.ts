import { Component, OnInit } from '@angular/core';
import { OrderService } from '@sharedModule/services/order.service';
import { APIorder } from '@sharedModule/types/order.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
})
export class ConfirmationPageComponent implements OnInit {
  response: APIorder;
  error: HttpErrorResponse;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.response.subscribe(
      (response: APIorder) => {
        this.response = response;
        console.log('response', response);
      }
    );

    this.orderService.error.subscribe(
      (error: HttpErrorResponse) => {
        this.error = error;
        console.log('error', error);
      }
    );
  }

}
