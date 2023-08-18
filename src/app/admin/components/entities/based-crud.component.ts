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
import {
  BasedCrudHttpService,
  ParamsHttp,
} from '@sharedModule/types/based-crud-http-service.interface';
import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';
import { Router } from '@angular/router';

export interface Params extends ParamsHttp {
  pageIndex: number;
  length: number;
}

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
  abstract params: Params;

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRouter: Router
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction === 'desc') {
      this.params.sort = `+${sortState.active}`;
      this.setData({
        limit: this.params.limit,
        page: this.params.page,
        sort: this.params.sort,
        filter: this.params.filter,
      });
      return;
    }

    if (sortState.direction === 'asc') {
      this.params.sort = `-${sortState.active}`;
      this.setData({
        limit: this.params.limit,
        page: this.params.page,
        sort: this.params.sort,
        filter: this.params.filter,
      });
      return;
    }
  }

  abstract mapEntityData(res: APIentity[]): Entity[];
  abstract getToolbarValue(searchValue: string): string[][];

  setAll(params: ParamsHttp): void {
    this.items$ = this.entityService.getAll(params).pipe(
      map((res: APIentity[]) => {
        return this.mapEntityData(res);
      })
    );
  }

  setData(params: ParamsHttp) {
    this.setAll(params);
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

    this.setData({
      limit: this.params.limit,
      page: this.params.page,
      sort: this.params.sort,
      filter: search,
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.params.pageIndex = pageEvent.pageIndex;
    this.params.page = pageEvent.pageIndex + 1;
    this.updateUrl();
    this.setData({
      limit: this.params.limit,
      page: this.params.page,
      sort: this.params.sort,
      filter: this.params.filter,
    });
  }

  onButtonClick(component: string, event: { button: string; id: string }) {
    if (event.id) {
      this.entityRouter.navigate([
        `/admin/${component}/${event.button}/${event.id}`,
      ]);
    } else {
      this.entityRouter.navigate([`/admin/${component}/${event.button}`]);
    }
  }

  updateUrl(): void {
    this.entityRouter.navigate([], {
      queryParams: { page: this.params.page },
    });
  }

  ngOnInit(): void {
    this.setData({
      limit: this.params.limit,
      page: this.params.page,
      sort: this.params.sort,
      filter: this.params.filter,
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
