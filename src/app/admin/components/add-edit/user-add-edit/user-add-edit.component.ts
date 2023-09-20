import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  APIuser,
  User,
} from '@sharedModule/services/entities/types/user.interface';
import { UsersService } from '@sharedModule/services/entities/users.service';
import { AddEditComponent } from '../add-edit.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent extends AddEditComponent<APIuser, User> {
  url = 'users';

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(usersService, route, router);
  }

  setFieldsUpfront(): void {}

  setValueInForm(): void {
    this.form.patchValue(this.item);
  }
}
