import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BasedCrudHttpService<APIentity, Entity> {
  constructor() {}

  abstract itemsCount$: Observable<number>;

  abstract getOne(id: string): Observable<APIentity>;
  abstract getAll(
    limit: number,
    page: number,
    sort: string,
    filter: string
  ): Observable<APIentity[]>;
  abstract create(body: APIentity): Observable<APIentity> | void;
  abstract update(body: APIentity): void;
  abstract remove(id: string): void;
}
