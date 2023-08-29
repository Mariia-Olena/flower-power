import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '@sharedModule/services/entities/users.service';
import { APIuser } from '@sharedModule/services/entities/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserEditResolver implements Resolve<APIuser> {
  constructor(private router: Router, private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APIuser> {
    return this.usersService.getOne(route.params?.['id'])
  }
}
