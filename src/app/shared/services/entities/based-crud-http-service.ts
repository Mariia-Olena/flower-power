import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ParamsHttp {
  limit: number;
  page: number;
  sort: string;
  filter: string[];
}

export abstract class BasedCrudHttpService<APIentity, Entity> {
  protected baseUrl = environment.baseUrl;
  protected _itemsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  itemsCount$: Observable<number> = this._itemsCount$.asObservable();
  showModal = new BehaviorSubject<boolean>(false);

  abstract getOne(id: string): Observable<APIentity>;
  abstract getAll(params: ParamsHttp): Observable<APIentity[]>;
  abstract create(body: Entity): Observable<APIentity>;
  abstract update(body: APIentity, id: string): Observable<APIentity>;
  abstract remove(id: string): Observable<APIentity>;

  setParams(params: ParamsHttp): HttpParams {
    return new HttpParams()
      .append('limit', params.limit.toString())
      .append('page', params.page.toString())
      .append('sort', params.sort)
      .append('filter', `${params.filter[0]};${params.filter[1]}`);
  }
}
