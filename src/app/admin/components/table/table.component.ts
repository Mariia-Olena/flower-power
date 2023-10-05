import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

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
export class TableComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[];
  @Input() actionConfig: ActionConfig[] = [];

  @Output() sortChange = new EventEmitter();

  urlName: string;

  constructor(private router: ActivatedRoute) {}

  onActionClick(button: ActionConfig, element) {
    button.onClick && button.onClick(element.id, element.name);
  }

  ngOnInit(): void {
    this.router.url.subscribe((segments) => {
      this.urlName = segments[segments.length - 1].path;
    });
  }
}
