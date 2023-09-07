import { AuthService } from '@admin/modules/login/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor(private authService: AuthService) {}

  onLogOutClick() {
    this.authService.logOut()
  }
}
