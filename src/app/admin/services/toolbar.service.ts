import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  toolbar$ = new BehaviorSubject<Toolbar>({
    searchValue: '',
    filterValue: '',
    filterName: '',
  });

  constructor() {}
}
