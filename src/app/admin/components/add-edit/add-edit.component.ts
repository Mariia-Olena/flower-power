import { LoginComponent } from '@admin/modules/login/components/login/login.component';
import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasedCrudHttpService } from '@sharedModule/services/entities/based-crud-http-service';
import { tap, map, Observable } from 'rxjs';

@Directive()
export abstract class AddEditComponent<APIentity, Entity> implements OnInit {
  name: string;
  item: APIentity;

  abstract form: FormGroup;

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRoute: ActivatedRoute
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
    if (this.entityRoute.snapshot.params['id']) {
      this.name = 'edit';
    } else {
      this.name = 'add';
    }
  }

  setValueInFormArray(array: string[], name: string): { name: string }[] {
    return array.reduce((acc, item) => {
      acc.push({ [name]: item });
      return acc;
    }, []);
  }

  ngOnInit(): void {
    this.setName();

    this.entityRoute.data.pipe(
      map((obj: { [key: string]: APIentity }) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            this.item = obj[key];
          }
        }
      })).subscribe();

    this.setFieldsUpfront(this.item)

    this.entityRoute.snapshot.params['id'] && this.setValueInForm();
  }
}
