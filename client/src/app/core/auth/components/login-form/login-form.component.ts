import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, AuthUser, TokenPair } from '@core/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
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
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  #submitSubscription!: Subscription;

  #fb = inject(FormBuilder);
  #service = inject(AuthService)
  #router = inject(Router)

  loginForm = this.#fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  onSubmit() {    
    if(this.loginForm.invalid)
      return

    this.#submitSubscription = this.#service.login(this.loginForm.value as AuthUser).subscribe({
      next: (res: any) => {                
        this.#service.setTokenPair(res.tokenPair.accessToken, res.tokenPair.refreshToken);        
        this.#router.navigate(['skaner'])
      },
      error: (err) => {
        console.error('an error occurred: ', err);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.#submitSubscription)
      this.#submitSubscription.unsubscribe()
  }
}
