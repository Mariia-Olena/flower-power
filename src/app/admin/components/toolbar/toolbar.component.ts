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
  @Input() tooltip: string
  @Output() toolbar = new EventEmitter<Event>();

  toolbarForm = new FormGroup({
    searchValue: new FormControl('', []),
    filterValue: new FormControl('', []),
    filterName: new FormControl('', []),
  });

  constructor(private toolbarService: ToolbarService) {}

  onSubmit() {
    console.log(this.toolbarForm.getRawValue());
    
    this.toolbarService.toolbar$.next(this.toolbarForm.getRawValue());
  }
}
