import {
  AfterViewInit,
  Directive,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BasedCrudHttpService } from '@sharedModule/types/based-crud-http-service.interface';
import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';
import { Router } from '@angular/router';

@Directive()
export abstract class BasedCrudComponent<APIentity, Entity>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() toolbar: Toolbar;

  items$: Observable<Entity[]> = new Observable<Entity[]>(null);

  dataSource: MatTableDataSource<any>;

  abstract options: string[];
  abstract displayedColumns: string[];
  abstract params: {
    limit: number;
    pageIndex: number;
    currentPage: number;
    sort: string;
    filter: string;
    length: number;
  };

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRouter: Router
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction === 'desc') {
      this.params.sort = `+${sortState.active}`;
      this.setData(
        this.params.limit,
        this.params.currentPage,
        this.params.sort,
        this.params.filter
      );
      return;
    }

    if (sortState.direction === 'asc') {
      this.params.sort = `-${sortState.active}`;
      this.setData(
        this.params.limit,
        this.params.currentPage,
        this.params.sort,
        this.params.filter
      );
      return;
    }
  }

  abstract mapEntityData(res: APIentity[]): Entity[];
  abstract getToolbarValue(searchValue: string): string;

  setAll(limit: number, page: number, sort: string, filter: string): void {
    this.items$ = this.entityService.getAll(limit, page, sort, filter).pipe(
      map((res: APIentity[]) => {
        return this.mapEntityData(res);
      })
    );
  }

  setData(limit: number, page: number, sort: string, filter: string) {
    this.setAll(limit, page, sort, filter);
    this.entityService.itemsCount$.subscribe((value) => {
      this.params.length = value;
    });
    this.items$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }

  onSubmit(toolbar: Toolbar) {
    const { searchValue, filterValue } = toolbar;
    const search = this.getToolbarValue(searchValue);

    this.setData(
      this.params.limit,
      this.params.currentPage,
      this.params.sort,
      search
    );
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.params.pageIndex = pageEvent.pageIndex;
    this.params.currentPage = pageEvent.pageIndex + 1;

    this.setData(
      this.params.limit,
      this.params.currentPage,
      this.params.sort,
      this.params.filter
    );
  }

  onButtonClick(component: string, event: any[]) {
console.log(component, event);

  }

  ngOnInit(): void {
    this.setData(
      this.params.limit,
      this.params.currentPage,
      this.params.sort,
      this.params.filter
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
