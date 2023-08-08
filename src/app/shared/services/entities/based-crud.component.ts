import { Sort } from '@angular/material/sort';
import { BasedCrudHttpService } from './based-crud-http.service';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';

export abstract class BasedCrudComponent<APIentity, Entity> {
  abstract items$: Observable<Entity[]>;
  abstract toolbar$: BehaviorSubject<Toolbar>;

  abstract options: string[];
  abstract displayedColumns: string[];
  abstract dataSource: MatTableDataSource<any>;
  abstract params: {
    limit: number;
    pageIndex: number;
    currentPage: number;
    sort: string;
    filter: string;
    length: number;
  };

  constructor(private entityService: BasedCrudHttpService<APIentity, Entity>) {}

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

  setAll(
    limit: number,
    page: number,
    sort: string,
    filter: string
  ): void {
    this.items$ = this.entityService.getAll(limit, page, sort, filter).pipe(
      map((res: APIentity[]) => {
        return this.mapEntityData(res);
      })
    );
  }

  onSubmit(event: Event) {
    const { searchValue, searchName, filterValue, filterName } =
      this.toolbar$.getValue();
    this.setData(
      this.params.limit,
      this.params.currentPage,
      this.params.sort,
      `${searchName};${searchValue}`
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

  setData(limit: number, page: number, sort: string, filter: string) {
    this.setAll(limit, page, sort, filter);
    this.entityService.itemsCount$.subscribe((value) => {
      this.params.length = value;
    });
    this.items$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }
}
