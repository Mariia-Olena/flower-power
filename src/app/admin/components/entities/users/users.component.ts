import { Component } from '@angular/core';
import { BasedCrudComponent } from '@admin/components/entities/based-crud.component';
import { UsersService } from '@sharedModule/services/entities/users.service';
import { UserAdmin, APIuser } from '@sharedModule/services/entities/types/user.interface';
import { ToolbarService } from '@admin/services/toolbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends BasedCrudComponent<APIuser, UserAdmin> {
  options = [
    'name',
    'price',
    'description',
    'author',
    'createdAt',
    'updatedAt',
  ];
  displayedColumns: string[] = ['id', 'name', 'created'];
  params = {
    limit: 10,
    pageIndex: 0,
    currentPage: 1,
    sort: 'name',
    filter: '',
    length: 1,
  };

  constructor(private usersService: UsersService, private toolBarService: ToolbarService) {
    super(usersService, toolBarService);
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

  getToolbarValue(searchValue: string): string {
    return `username;${searchValue}`
  }
}
