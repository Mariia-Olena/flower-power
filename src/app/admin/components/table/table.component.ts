import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductsService } from '@sharedModule/services/products.service';
import { APIproduct } from '@sharedModule/types/product-plant.interface';
import { Observable, map } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { Params } from '../../types/admin.interface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[];
  @Input() params: Params = {
    limit: 15,
    pageIndex: 0,
    currentPage: 1,
    sortAPI: 'name',
    filter: '',
    length: 1,
  }

  @ViewChild(MatSort) sort: MatSort;

  announceSortChange(sortState: Sort) {
    // if (sortState.direction === 'desc') {
    //   this.params.sortAPI = `+${sortState.active}` ;
    //   this.setData(this.params.limit, this.params.currentPage, this.params.sortAPI, this.params.filter);
    //   return
    // }
    // if (sortState.direction === 'asc') {
    //   this.params.sortAPI = `-${sortState.active}` ;
    //   this.setData(this.params.limit, this.params.currentPage, this.params.sortAPI, this.params.filter);
    //   return
    // }
  }

}
