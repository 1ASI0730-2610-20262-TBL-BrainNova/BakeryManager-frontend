import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '../../../application/services/authentication.service';
import { SignUpRequestDto } from '../../../application/dtos/sign-up.request.dto';
import { RoleType } from '../../../domain/model/enums/role-type.enum';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  readonly roles = [
    { value: RoleType.OWNER, labelKey: 'sign-up.roles.owner' },
    { value: RoleType.ADMINISTRATOR, labelKey: 'sign-up.roles.administrator' },
    { value: RoleType.OPERATIONAL_STAFF, labelKey: 'sign-up.roles.operational-staff' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        role: [RoleType.OPERATIONAL_STAFF, Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const request: SignUpRequestDto = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      role: this.signUpForm.value.role,
    };

    this.authService.signUp(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('sign-up.success');
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.status === 409) {
          this.errorMessage.set('sign-up.errors.email-taken');
        } else if (error.status === 0) {
          this.errorMessage.set('sign-up.errors.no-connection');
        } else {
          this.errorMessage.set('sign-up.errors.unexpected');
        }
      },
    });
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }
  toggleConfirmPassword(): void {
    this.showConfirmPassword.update((v) => !v);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.signUpForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  get passwordMismatch(): boolean {
    return !!(
      this.signUpForm.errors?.['passwordMismatch'] &&
      this.signUpForm.get('confirmPassword')?.touched
    );
  }

  get firstNameControl() {
    return this.signUpForm.get('firstName');
  }
  get lastNameControl() {
    return this.signUpForm.get('lastName');
  }
  get emailControl() {
    return this.signUpForm.get('email');
  }
  get passwordControl() {
    return this.signUpForm.get('password');
  }
}
