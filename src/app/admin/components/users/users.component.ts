import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';

interface User {
  id: string;
  name: string;
  created: string;
}

interface UserAPI {
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  users$: Observable<User[]>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'created'];

  limit = 10;
  pageIndex = 0;
  currentPage = 1;
  sortAPI = 'name';
  filter: '';

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private adminService: AdminService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  setAllUsers(limit: number, page: number, sort: string, filter?: string) {
    this.users$ = this.adminService.getAllUsers(limit, page, sort, filter).pipe(
      map((res: UserAPI[]) => {
        return res.map((user: UserAPI) => {
          return {
            id: user.id,
            name: user.username,
            created: user.createdAt,
          };
        });
      })
    );
  }

  setData() {
    this.setAllUsers(this.limit, this.currentPage, this.sortAPI, this.filter);
    this.users$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.currentPage = pageEvent.pageIndex + 1;

    this.setData();
  }

  ngOnInit(): void {
    this.setData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
