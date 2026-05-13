import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '../../../application/services/authentication.service';
import { SignInRequestDto } from '../../../application/dtos/sign-in.request.dto';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const request: SignInRequestDto = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
    };

    this.authService.signIn(request).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.status === 401) {
          this.errorMessage.set('sign-in.errors.invalid-credentials');
        } else if (error.status === 0) {
          this.errorMessage.set('sign-in.errors.no-connection');
        } else {
          this.errorMessage.set('sign-in.errors.unexpected');
        }
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  get emailControl() {
    return this.signInForm.get('email');
  }
  get passwordControl() {
    return this.signInForm.get('password');
  }

  isFieldInvalid(field: string): boolean {
    const control = this.signInForm.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
