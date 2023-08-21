import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Toolbar } from './types/toolbar.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() options: {
    search: string[];
    filter: string[];
  };
  @Input() item: string;
  @Output() toolbar = new EventEmitter<Toolbar>();
  @Output() onAddButtonClick = new EventEmitter<Event>();

  toolbarForm = new FormGroup({
    searchValue: new FormControl('', []),
    searchName: new FormControl('', []),
    filterValue: new FormControl('', []),
    filterName: new FormControl('', []),
  });

  onSubmit() {
    this.toolbar.emit(this.toolbarForm.getRawValue());
  }
}
