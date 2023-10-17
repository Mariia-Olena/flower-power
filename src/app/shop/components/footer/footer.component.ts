import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  dropDown = new Set<number>();

  onDropDownClick(listNumber: number): void {
    this.dropDown.has(listNumber)
      ? this.dropDown.delete(listNumber)
      : this.dropDown.add(listNumber);
  }
}
