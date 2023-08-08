import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BasedCrudComponent } from '@sharedModule/services/entities/based-crud.component';
import { UsersService } from '@sharedModule/services/entities/users.service';
import { UserAdmin, APIuser } from '@sharedModule/services/entities/types/user.interface';
import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent
  extends BasedCrudComponent<APIuser, UserAdmin>
  implements OnInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  items$: Observable<UserAdmin[]> = new Observable<UserAdmin[]>(null);
  toolbar$ = new BehaviorSubject<Toolbar>(null);

  options = [
    'name',
    'price',
    'description',
    'author',
    'createdAt',
    'updatedAt',
  ];
  displayedColumns: string[] = ['id', 'name', 'created'];
  dataSource: MatTableDataSource<any>;
  params = {
    limit: 10,
    pageIndex: 0,
    currentPage: 1,
    sort: 'name',
    filter: '',
    length: 1,
  };

  constructor(private usersService: UsersService) {
    super(usersService);
    this.dataSource = new MatTableDataSource<any>();
  }

  mapEntityData(res: APIuser[]): UserAdmin[] {
    return res.map((user: APIuser) => {
      return {
        id: user.id,
        name: user.username,
        created: user.createdAt,
      };
    });
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
