import {
  AfterViewInit,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  BasedCrudHttpService,
  ParamsHttp,
} from '@sharedModule/services/entities/based-crud-http-service';
import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionConfig } from '../table/table.component';

export interface Params extends ParamsHttp {
  pageIndex: number;
  length: number;
}

@Directive()
export abstract class BasedCrudComponent<APIentity, Entity, EntityAdmin>
  implements OnInit, OnDestroy
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() toolbar: Toolbar;

  items$: Observable<EntityAdmin[]> = new Observable<EntityAdmin[]>(null);

  dataSource: MatTableDataSource<any>;

  showModal = {
    value: false,
    id: '',
    name: '',
  };

  actionConfig: ActionConfig[] = [
    {
      name: 'edit',
      onClick: (id: string) => {
        this.entityRouter.navigate([`${id}`], {
          relativeTo: this.entityRoute,
        });
      },
      icon: 'edit',
      color: 'primary',
      disabled: () => false,
    },
    {
      name: 'remove',
      onClick: (id: string, name: string) => {
        this.showModal.value = true;
        this.showModal.id = id;
        this.showModal.name = name;
      },
      icon: 'delete',
      color: 'warn',
      disabled: () => false,
    },
  ];

  confirm(confirmation: boolean, id: string) {
    if (confirmation && id) {
      this.entityService.remove(id).subscribe((res) => {
        this.setData({
          limit: this.params.limit,
          page: this.params.page,
          sort: this.params.sort,
          filter: this.params.filter,
        });
      });
    }

    this.showModal.value = false;
  }

  abstract options: { search: string[]; filter: string[] };
  abstract displayedColumns: string[];
  abstract params: Params;

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRouter: Router,
    private entityRoute: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction === 'desc') {
      this.params.sort = sortState.active;
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

  abstract mapEntityData(res: APIentity[]): EntityAdmin[];

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
    const { searchValue, searchName, filterValue, filterName } = toolbar;
    const search = this.getToolbarValue(searchName, searchValue);

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

  onAddButtonClick(event: Event) {
    this.entityRouter.navigate(['add'], {
      relativeTo: this.entityRoute,
    });
  }

  updateUrl(): void {
    this.entityRouter.navigate([], {
      queryParams: { page: this.params.page },
    });
  }

  getToolbarValue(searchName: string, searchValue: string): string[] {
    return [searchName, searchValue];
  }

  ngOnInit(): void {
    this.setData({
      limit: this.params.limit,
      page: this.params.page,
      sort: this.params.sort,
      filter: this.params.filter,
    });
  }

  ngOnDestroy(): void {
    this.entityService.showModal.next(false);
  }
}
