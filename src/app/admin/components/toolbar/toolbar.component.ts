import { ToolbarService } from '@admin/services/toolbar.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() options: string[];
  @Output() toolbar = new EventEmitter<Event>();

  toolbarForm = new FormGroup({
    searchValue: new FormControl('', []),
    searchName: new FormControl('', []),
    filterValue: new FormControl('', []),
    filterName: new FormControl('', []),
  });

  constructor(private toolbarService: ToolbarService) {}

  onSubmit() {
    this.toolbarService.toolbar$.next(this.toolbarForm.getRawValue());
  }
}
