import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BasedCrudHttpService<APIentity, Entity> {
  itemsCount$: Observable<number>;
  getOne(id: string): Observable<APIentity>;
  getAll(params: ParamsHttp): Observable<APIentity[]>;
  create(body: APIentity): Observable<APIentity> | void;
  update(body: APIentity): void;
  remove(id: string): void;
  setParams(params: ParamsHttp): HttpParams;
}

export interface ParamsHttp {
  limit: number;
  page: number;
  sort: string;
  filter: string[][];
}
