import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective {
  constructor() {}

  @HostBinding('class') get classes(): string {
    return 'button';
  }
}
