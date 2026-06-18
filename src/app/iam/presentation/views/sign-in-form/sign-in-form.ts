import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { IamStore } from '../../../application/iam.store';
import { SignInCommand } from '../../../domain/model/sign-in.command';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/**
 * Collects credentials and triggers IAM sign-in.
 * @author Jareth Vidal Malaga
 */
@Component({
  selector: 'app-sign-in-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.css',
})
export class SignInForm extends BaseForm {
  private router = inject(Router);
  private store = inject(IamStore);

  /**
   * Form-group for the sign-in form.
   */
  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  /**
   * Performs the sign-in operation if the form is valid.
   */
  performSignIn() {
    if (this.form.invalid) return;
    const signInCommand = new SignInCommand({
      username: this.form.value.username!,
      password: this.form.value.password!,
    });
    this.store.signIn(signInCommand, this.router);
  }
}
