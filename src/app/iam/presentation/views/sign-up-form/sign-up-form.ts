import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { IamStore } from '../../../application/iam.store';
import { SignUpCommand } from '../../../domain/model/sign-up.command';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/**
 * Collects credentials and triggers IAM sign-up.
 * @author Jareth Vidal Malaga
 */
@Component({
  selector: 'app-sign-up-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm extends BaseForm {
  private router = inject(Router);
  private store = inject(IamStore);

  /**
   * Form-group for the sign-up form.
   */
  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  /**
   * Performs the sign-up operation if the form is valid.
   */
  performSignUp() {
    if (this.form.invalid) return;
    const signUpCommand = new SignUpCommand({
      username: this.form.value.username!,
      password: this.form.value.password!,
    });
    this.store.signUp(signUpCommand, this.router);
  }
}
