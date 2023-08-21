import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasedCrudHttpService } from '@sharedModule/services/entities/based-crud-http-service';
import { tap, Observable } from 'rxjs';

@Directive()
export abstract class AddEditComponent<APIentity, Entity> implements OnInit {
  name: string;
  item$: Observable<APIentity>;
  item: APIentity;

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRoute: ActivatedRoute
  ) {}

  abstract setFieldsUpfront(): void;

  getControl(array: string, index: number): FormGroup {
    return this[array].controls[index] as FormGroup;
  }

  delete(controlName: string, index: number) {
    this[controlName].removeAt(index);
  }

  getItem(): void {
    this.entityRoute.params.subscribe(({ id }) => {
      console.log(id);

      this.entityService
        .getOne(id)
        .pipe(
          tap((value: APIentity) => {
            console.log(value);
            this.item = value;
          })
        )
        .subscribe();
    });
  }

  setName(): void {
    if (this.entityRoute.snapshot.params['id']) {
      this.name = 'edit';
    } else {
      this.name = 'add';
    }
  }

  ngOnInit(): void {
    this.setName();
    this.getItem();
    this.setFieldsUpfront();
  }
}
