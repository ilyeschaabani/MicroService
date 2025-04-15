import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../services/Forgetpassword/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) return;

    const { password, repeatPassword } = this.resetForm.value;
    const email = this.forgetPasswordService.getStoredEmail();

    this.isLoading = true;
    this.forgetPasswordService.changePassword(email, password, repeatPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Mot de passe réinitialisé avec succès.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error || 'Échec de la réinitialisation du mot de passe.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    });
  }
}
