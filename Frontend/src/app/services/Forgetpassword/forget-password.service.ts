import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private apiUrl = 'http://localhost:9006/forgotPassword';
  private storedEmail: string = '';

  constructor(private http: HttpClient) { }

  sendOTP(email: string) {
    this.storedEmail = email; // Store the email for later use
    return this.http.post(`${this.apiUrl}/verifyMail/${email}`, {});
  }
  verifyOTP(otp: string, email: string) {
    return this.http.post(`${this.apiUrl }/verifyOTP/${otp}/${email}`, {});
  }
  changePassword(email: string, newPassword: string, confirmPassword: string) {
    return this.http.post(`${this.apiUrl}/changePassword/${email}`, {
      password: newPassword,
      rpeatPassword: confirmPassword
    });
  }
  getStoredEmail(): string {
    return this.storedEmail;
  }
}
