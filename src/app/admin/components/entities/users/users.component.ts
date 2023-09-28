import { Component } from '@angular/core';
import { BasedCrudComponent } from '@admin/components/entities/based-crud.component';
import { UsersService } from '@sharedModule/services/entities/users.service';
import {
  UserAdmin,
  User,
  APIuser,
} from '@sharedModule/services/entities/types/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends BasedCrudComponent<APIuser, User, UserAdmin> {
  options = {
    search: ['username'],
    filter: [
      'name',
      'price',
      'description',
      'author',
      'createdAt',
      'updatedAt',
    ],
  };
  displayedColumns: string[] = ['id', 'name', 'created', 'edit'];
  params = {
    limit: 10,
    pageIndex: 0,
    page: 1,
    sort: 'name',
    filter: [],
    length: 1,
  };

  constructor(
    public usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(usersService, router, route);
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
}
