import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgetPasswordService } from '../services/Forgetpassword/forget-password.service'; // update the import path as needed

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  currentStep: 'email' | 'otp' | 'password' = 'email';
  email: string = '';

  // Email Form
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  // OTP Form
  otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  // Password Form
  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgetPasswordService
  ) {}

  // Step 1: Send OTP
  sendOTP() {
    if (this.emailForm.valid) {
      this.email = this.emailForm.value.email!;
      this.forgotPasswordService.sendOTP(this.email).subscribe({
        next: () => this.currentStep = 'otp',
        error: (err: HttpErrorResponse) => alert(err.error.message || 'Failed to send OTP')
      });
    }
  }

  // Step 2: Verify OTP
  verifyOTP() {
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otp!;
      this.forgotPasswordService.verifyOTP(otp, this.email).subscribe({
        next: () => this.currentStep = 'password',
        error: (err: HttpErrorResponse) => alert(err.error.message || 'Invalid OTP')
      });
    }
  }

  // Step 3: Reset Password
  resetPassword() {
    const newPassword = this.passwordForm.value.newPassword!;
    const confirmPassword = this.passwordForm.value.confirmPassword!;

    if (this.passwordForm.valid && newPassword === confirmPassword) {
      this.forgotPasswordService.changePassword(this.email, newPassword, confirmPassword).subscribe({
        next: () => alert('Password reset successful!'),
        error: (err: HttpErrorResponse) => alert(err.error.message || 'Failed to reset password')
      });
    } else {
      alert('Passwords do not match');
    }
  }
}
