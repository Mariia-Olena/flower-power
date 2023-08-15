import { ToolbarService } from '@admin/services/toolbar.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Toolbar } from './types/toolbar.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() options: string[];
  @Input() tooltip: string
  @Output() toolbar = new EventEmitter<Toolbar>();

  toolbarForm = new FormGroup({
    searchValue: new FormControl('', []),
    filterValue: new FormControl('', []),
    filterName: new FormControl('', []),
  });

  constructor(private toolbarService: ToolbarService) {}

  onSubmit() {
    const toolbarValue = this.toolbarForm.getRawValue()
    this.toolbar.emit(toolbarValue)
  }
}
