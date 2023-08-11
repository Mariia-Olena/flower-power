import { Observable } from 'rxjs';

export interface BasedCrudHttpService<APIentity, Entity> {
  itemsCount$: Observable<number>;
  getOne(id: string): Observable<APIentity>;
  getAll(
    limit: number,
    page: number,
    sort: string,
    filter: string
  ): Observable<APIentity[]>;
  create(body: APIentity): Observable<APIentity> | void;
  update(body: APIentity): void;
  remove(id: string): void;
}
