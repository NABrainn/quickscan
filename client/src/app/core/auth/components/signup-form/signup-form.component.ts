import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, AuthUser } from '@core/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatCard,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './signup-form.component.html'
})
export class SignupFormComponent implements OnDestroy {

  #submitSubscription!: Subscription;

  #fb = inject(FormBuilder);
  #service = inject(AuthService)
  #router = inject(Router)

  signupForm = this.#fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  onSubmit() {    
    if(this.signupForm.invalid)
      return
    
    this.#submitSubscription = this.#service.signup(this.signupForm.value as AuthUser).subscribe({
      next: () => {
        this.#router.navigate(['logowanie'])
      },
      error: (err) => {
        console.error('an error occurred: ', err);
      }
    })
  }

  ngOnDestroy(): void {
    this.#submitSubscription.unsubscribe()
  }
}
