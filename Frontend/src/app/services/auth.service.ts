import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignUpRequest, SignInRequest, AuthResponse } from "../Models/User.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9006/api/auth'; // API Gateway

  constructor(private http: HttpClient) {}

  signUp(user: SignUpRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, user);
  }

  signIn(credentials: SignInRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, credentials).pipe(
      tap((response: AuthResponse) => {
        console.log('AuthResponse received:', response);
        // Save user information and token in localStorage
        localStorage.setItem('token', response.token);
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          console.log('User information saved to localStorage:', response.user);
        } else {
          console.warn('No user information found in AuthResponse');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    console.log('Retrieved user from localStorage:', user);
    return user ? JSON.parse(user) : null;
  }


}