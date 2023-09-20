import { leadingComment } from '@angular/compiler';
import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasedCrudHttpService } from '@sharedModule/services/entities/based-crud-http-service';
import { map, take } from 'rxjs';

@Directive()
export abstract class AddEditComponent<APIentity, Entity> implements OnInit {
  abstract url: string;
  abstract form: FormGroup;
  name: string;
  item: APIentity;
  isEditPage: boolean;

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRoute: ActivatedRoute,
    private entityRouter: Router
  ) {}

  abstract setFieldsUpfront(item?: APIentity): void;

  abstract setValueInForm(): void;

  getControl(array: string, index: number): FormGroup {
    return this[array].controls[index] as FormGroup;
  }

  delete(controlName: string, index: number) {
    this[controlName].removeAt(index);
  }

  setName(): void {
    this.entityRoute.snapshot.params['id']
      ? (this.name = 'edit')
      : (this.name = 'add');
  }

  setValueInFormArray(array: string[], name: string): { name: string }[] {
    return array.reduce((acc, item) => {
      acc.push({ [name]: item });
      return acc;
    }, []);
  }

  getFormValue(): Entity {
    return this.form.getRawValue();
  }

  onResetButton() {
    this.setValueInForm();
  }

  onCancelButton() {
    this.entityRouter.navigate([`/admin/${this.url}`])
  }

  onSubmit(body: Entity) {
    if (this.name === 'add') {
      this.entityService.create(body).subscribe((res: APIentity) => {
        
      });
    }

    if (this.name === 'edit') {
      this.entityService.update(body, this.entityRoute.snapshot.params['id']).subscribe((res: APIentity) => {
        
      });
    }

    this.entityRouter.navigate([`/admin/${this.url}`])
  }

  ngOnInit(): void {
    this.setName();

    this.name === 'edit' &&
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

    this.setFieldsUpfront(this.item);

    this.entityRoute.snapshot.params['id'] && this.setValueInForm();

    this.name === 'edit' ? this.isEditPage = true : this.isEditPage = false;
  }
}
