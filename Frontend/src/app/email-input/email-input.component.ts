import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../services/Forgetpassword/forget-password.service'; // update the import path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})

export class EmailInputComponent {
  

  emailForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgetPasswordService,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  // onSubmit() {
  //   if (this.emailForm.invalid) return;

  //   this.isLoading = true;
  //   this.errorMessage = '';
    
  //   const email = this.emailForm.value.email;
    
  //   this.forgotPasswordService.sendOTP(email).subscribe({
  //     next: () => {
  //       this.isLoading = false;
  //       // Navigate to OTP verification or use service to manage state
  //       this.router.navigate(['/forgot-password/otp']);
  //     },
  //     error: (err) => {
  //       this.isLoading = false;
  //       this.errorMessage = err.error || 'Failed to send OTP. Please try again.';
  //     }
  //   });
  // }
  SendOTP() {
    this.forgotPasswordService.sendOTP(this.emailForm.value.email).subscribe({
      next: () => {
        console.log('OTP sent successfully');
      },
      error: (err) => {
        this.router.navigate(['/otpverification']);
        this.isLoading = false;
        console.error('Error sending OTP:', err);
      }
    });
  }

  
}


