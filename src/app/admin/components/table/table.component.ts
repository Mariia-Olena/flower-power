import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface ActionConfig {
  name: string;
  onClick: (id: string, name: string) => void;
  icon: string;
  color: string;
  disabled: () => boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[];
  @Input() actionConfig: ActionConfig[] = [];

  @Output() sortChange = new EventEmitter();

  onActionClick(button: ActionConfig, element) {    
    button.onClick && button.onClick(element.id, element.name)
  }
}
