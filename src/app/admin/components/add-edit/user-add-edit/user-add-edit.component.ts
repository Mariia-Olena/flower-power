import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddEditComponent } from '../add-edit.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent extends AddEditComponent {
  userForm = new FormGroup({
    username: new FormControl('', []),
    password: new FormControl('', []),
  });
}
