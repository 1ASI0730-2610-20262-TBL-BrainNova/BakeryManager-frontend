import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { AuthenticationHttpService } from '../../infrastructure/services/authentication-http.service';
import { AuthenticationDomainService } from '../../domain/services/authentication-domain.service';

import { SignInRequestDto } from '../dtos/sign-in.request.dto';
import { SignInResponseDto } from '../dtos/sign-in.response.dto';
import { SignUpRequestDto } from '../dtos/sign-up.request.dto';

import { User } from '../../domain/model/entities/user.entity';
import { RoleType } from '../../domain/model/enums/role-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly TOKEN_KEY = 'bakery_token';
  private readonly REFRESH_TOKEN_KEY = 'bakery_refresh_token';
  private readonly USER_KEY = 'bakery_user';

  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private httpService: AuthenticationHttpService,
    private domainService: AuthenticationDomainService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  signIn(request: SignInRequestDto): Observable<SignInResponseDto> {
    return this.httpService.signIn(request).pipe(
      tap((response) => {
        this.saveSession(response);
        const route = this.domainService.getDashboardRouteForRole(response.role);
        this.router.navigate([route]);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  signUp(request: SignUpRequestDto): Observable<void> {
    return this.httpService.signUp(request).pipe(
      tap(() => {
        this.router.navigate(['/sign-in']);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  signOut(): void {
    this.clearSession();
    this.router.navigate(['/sign-in']);
  }

  refreshToken(): Observable<SignInResponseDto> {
    const refreshToken = this.getRefreshToken();
    return this.httpService.refreshToken(refreshToken!).pipe(
      tap((response) => {
        this.saveSession(response);
      }),
      catchError((error) => {
        this.signOut();
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.domainService.isTokenExpired(token);
  }

  hasRole(role: RoleType): boolean {
    const user = this.currentUser();
    return user?.role === role;
  }

  private saveSession(response: SignInResponseDto): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);

    const user = new User(
      response.id,
      response.firstName,
      response.lastName,
      response.email,
      '',
      response.role
    );

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    const userJson = localStorage.getItem(this.USER_KEY);

    if (token && userJson && !this.domainService.isTokenExpired(token)) {
      const userData = JSON.parse(userJson);
      const user = new User(
        userData.id,
        userData.firstName,
        userData.lastName,
        userData.email,
        '',
        userData.role
      );
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }
}
