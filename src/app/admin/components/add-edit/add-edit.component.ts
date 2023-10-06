import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasedCrudHttpService } from '@sharedModule/services/entities/based-crud-http-service';
import { map, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Buttons {
  name: string;
  onClick: () => void;
  color: string;
  disabled: () => boolean;
}

@Directive()
export abstract class AddEditComponent<APIentity, Entity> implements OnInit {
  abstract url: string;
  abstract itemName: string;
  abstract form: FormGroup;
  name: string;
  item: APIentity;
  isEditPage: boolean;

  buttons: Buttons[] = [
    {
      name: 'submit',
      onClick: () => {},
      color: 'primary',
      disabled: () => this.form.touched && !this.form.valid,
    },
    {
      name: 'reset',
      onClick: () => {
        this.onResetButton();
      },
      color: 'accent',
      disabled: () => !this.form.dirty,
    },
    {
      name: 'cancel',
      onClick: () => {
        this.onCancelButton();
      },
      color: 'warn',
      disabled: () => false,
    },
  ];

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRoute: ActivatedRoute,
    private entityRouter: Router,
    private entitySnackBar: MatSnackBar
  ) {}

  abstract setFieldsUpfront(): void;

  abstract setValueInForm(): void;

  abstract onResetButton(): void;

  getControl(array: string, index: number): FormGroup {
    return this[array].controls[index] as FormGroup;
  }

  delete(controlName: string, index: number) {
    this[controlName].removeAt(index);
  }

  setName(): void {
    this.entityRoute.snapshot.params['id']
      ? (this.name = 'edit') && (this.isEditPage = true)
      : (this.name = 'add') && (this.isEditPage = false);
  }

  setValueInFormArray(array: string[], name: string): { name: string }[] {
    return array.reduce((acc, item) => {
      acc.push({ [name]: item });
      return acc;
    }, []);
  }

  getFormValue() {
    return this.form.getRawValue();
  }

  onCancelButton() {
    this.entityRouter.navigate([`/admin/${this.url}`]);
  }

  onSubmit(body: Entity) {
    if (!this.isEditPage && this.form.valid) {
      this.entityService.create(body).subscribe({
        next: (value: APIentity) => {
          this.entityRouter.navigate([`/admin/${this.url}`]);
          this.showModalMessage(`${this.itemName} was successfully created`, 'ok');
        },
        error: (error) => {
          this.showModalMessage('Something went wrong, try again later', 'error');
        },
      });
    }

    if (this.isEditPage && this.form.valid) {
      this.entityService
        .update(body, this.entityRoute.snapshot.params['id'])
        .subscribe({
          next: (value: APIentity) => {
            this.entityRouter.navigate([`/admin/${this.url}`]);
            this.showModalMessage(`${this.itemName} was successfully updated`, 'ok');
          },
          error: (error) => {
            this.showModalMessage('Something went wrong, try again later', 'error');
          },
        });
    }

    this.form.markAllAsTouched();
  }

  showModalMessage(message: string, result: string) {
    this.entitySnackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['modal-message', result],
    });
  }

  ngOnInit(): void {
    this.setName();

    this.isEditPage &&
      this.entityRoute.data
        .pipe(
          take(1),
          map((obj: { [key: string]: APIentity }) => {
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                return obj[key];
              }
            }

            return null;
          })
        )
        .subscribe((data) => {
          data
            ? (this.item = data)
            : this.entityRouter.navigate([`/admin/${this.url}`]);
        });

    this.setFieldsUpfront();

    this.entityRoute.snapshot.params['id'] && this.setValueInForm();
  }
}
