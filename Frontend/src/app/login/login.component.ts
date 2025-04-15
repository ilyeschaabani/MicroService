import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signIn({ email: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']); // Redirect to dashboard or another page
      },
      error: (err) => {
        console.error('Login error', err);
        this.message = 'Login failed. Please check your credentials and try again.';
      }
    });
  }
  // add methode to handel forget pwd from the backend
 
}