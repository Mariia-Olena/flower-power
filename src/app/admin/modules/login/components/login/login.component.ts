import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('admin', [Validators.required]),
    password: new FormControl('123123', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.logIn(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['admin']);
      },
      error: (error) => {
        this.loginForm.setErrors({ credentials: true });
      },
    });
  }
}
