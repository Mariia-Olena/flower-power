import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
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

  users$: Observable<User[]>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'created'];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private adminService: AdminService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  getAllUsers() {
    this.users$ = this.adminService.getAllUsers().pipe(
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.users$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
