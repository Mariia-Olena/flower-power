import { Directive } from '@angular/core';
import { BasedCrudHttpService } from '@sharedModule/services/entities/based-crud-http-service';
import { Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Directive()
export abstract class EditResolver<APIentity, Entity> {
  constructor(private entityService: BasedCrudHttpService<APIentity, Entity>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<APIentity> {
    return this.entityService.getOne(route.params?.['id']); 
  }
}
