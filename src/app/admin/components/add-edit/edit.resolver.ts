import { Directive } from '@angular/core';
import { BasedCrudHttpService } from '@sharedModule/services/entities/based-crud-http-service';
import { Observable, tap } from 'rxjs';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

@Directive()
export abstract class EditResolver<APIentity, Entity>  {
  abstract url: string;

  constructor(
    private entityService: BasedCrudHttpService<APIentity, Entity>,
    private entityRoute: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APIentity> {
   return this.entityService.getOne(route.params?.['id']).pipe(
      tap((data: APIentity) => {
        if(!data) {
          this.entityRoute.navigate([`/admin/${this.url}`])
        }
      })
    )
  }
}
