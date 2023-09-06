import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { UsersService } from '@sharedModule/services/entities/users.service';
import { APIuser, User } from '@sharedModule/services/entities/types/user.interface';
import { EditResolver } from '../edit.resolver';

@Injectable({
  providedIn: 'root',
})
export class UserEditResolver extends EditResolver<APIuser, User> implements Resolve<APIuser> {
  url = 'users';

  constructor(private usersService: UsersService, private router: Router) {
    super(usersService, router);
  }
}
