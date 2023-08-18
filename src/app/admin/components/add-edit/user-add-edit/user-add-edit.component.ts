import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIuser, UserAdmin } from '@sharedModule/services/entities/types/user.interface';
import { UsersService } from '@sharedModule/services/entities/users.service';
import { AddEditComponent } from '../add-edit.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent extends AddEditComponent<APIuser, UserAdmin> {
  userForm = new FormGroup({
    username: new FormControl('', []),
    password: new FormControl('', []),
  });

  constructor(private usersService: UsersService, private route: ActivatedRoute) {
    super(usersService, route)
  }

  setFieldsUpfront(): void {}
}
