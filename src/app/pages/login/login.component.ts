import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginData } from '@shared/models/login';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgOptimizedImage, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup = new FormBuilder().group({
    user: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(private _authService: AuthService, private _router: Router) {}

  get user() {
    return this.formGroup.controls.user;
  }

  get password() {
    return this.formGroup.controls.password;
  }

  login() {
    if (this.formGroup.invalid) return;
    this._authService.login(this.formGroup.value as LoginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['..', 'shopping'])
      },
      error: () => {
        this.password.setErrors({...(this.password.errors ?? {}), server: true})
      }
    });
  }
}
