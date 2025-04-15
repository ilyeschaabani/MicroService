import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../services/Forgetpassword/forget-password.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OTPverificationComponent {
  otpForm: FormGroup;
  email: string = '';
  countdown: number = 60;
  canResend: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit6: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]]
    });
  }

  ngOnInit(): void {
    this.email = this.forgetPasswordService.getStoredEmail();
    this.startCountdown();
  }

  get otp(): string {
    return Object.values(this.otpForm.value).join('');
  }

  onInputChange(event: any, currentField: string, nextField?: string) {
    const value = event.target.value;
    if (value.length === 1 && nextField) {
      (document.getElementById(nextField) as HTMLInputElement).focus();
    }
  }

  startCountdown() {
    const source = timer(1000, 1000);
    const subscribe = source.subscribe(val => {
      this.countdown = 60 - val;
      if (this.countdown <= 0) {
        subscribe.unsubscribe();
        this.canResend = true;
      }
    });
  }

  resendOTP() {
    if (this.canResend) {
      this.isLoading = true;
      this.forgetPasswordService.sendOTP(this.email).subscribe({
        next: () => {
          this.isLoading = false;
          this.canResend = false;
          this.countdown = 60;
          this.startCountdown();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error || 'Failed to resend OTP. Please try again.';
        }
      });
    }
  }

  verifyOTP() {
    if (this.otpForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.forgetPasswordService.verifyOTP(this.otp, this.email).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('OTP verified successfully');
       this.router.navigate(['/reset']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error || 'Invalid OTP. Please try again.';
        this.otpForm.reset();
        this.router.navigate(['/reset']);
      }
    });
  }

}
