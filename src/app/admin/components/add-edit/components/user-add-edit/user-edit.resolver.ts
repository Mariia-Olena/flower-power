import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UsersService } from '@sharedModule/services/entities/users.service';
import {
  APIuser,
  User,
} from '@sharedModule/services/entities/types/user.interface';
import { EditResolver } from '@admin/components/add-edit/edit.resolver';

@Injectable({
  providedIn: 'root',
})
export class UserEditResolver
  extends EditResolver<APIuser, User>
  implements Resolve<APIuser>
{
  constructor(private usersService: UsersService) {
    super(usersService);
  }
}
