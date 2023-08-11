import { Component } from '@angular/core';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import { OrderAdmin, APIorder } from '@sharedModule/services/entities/types/order.interface';
import { BasedCrudComponent } from '@admin/components/entities/based-crud.component';
import { ToolbarService } from '@admin/services/toolbar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BasedCrudComponent<APIorder, OrderAdmin> {
  options = [
    'name',
    'price',
    'description',
    'author',
    'createdAt',
    'updatedAt',
  ];
  displayedColumns: string[] = ['id', 'name', 'phone', 'created'];
  params = {
    limit: 10,
    pageIndex: 0,
    currentPage: 1,
    sort: 'name',
    filter: '',
    length: 1,
  };

  constructor(private ordersService: OrdersService, private toolBarService: ToolbarService) {
    super(ordersService, toolBarService);
  }

  mapEntityData(res: APIorder[]): OrderAdmin[] {
    return res.map((order: APIorder) => {
      return {
        id: order.id,
        name: order.name,
        phone: order.phone,
        created: order.createdAt,
        products: order.products,
      };
    });
  }

  getToolbarValue(searchValue: string): string {
    return `name;${searchValue}`
  }
}
