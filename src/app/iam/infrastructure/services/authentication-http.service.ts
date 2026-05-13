import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { SignInRequestDto } from '../../application/dtos/sign-in.request.dto';
import { SignInResponseDto } from '../../application/dtos/sign-in.response.dto';
import { SignUpRequestDto } from '../../application/dtos/sign-up.request.dto';
import { RoleType } from '../../domain/model/enums/role-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHttpService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';
  private readonly MOCK_USERS_KEY = 'bakery_mock_users';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // TODO: remove mock when backend is ready
  signIn(request: SignInRequestDto): Observable<SignInResponseDto> {
    const users = this.getMockUsers();
    const user = users.find((u) => u.email === request.email && u.password === request.password);

    if (!user) {
      return throwError(() => ({ status: 401 }));
    }

    return of({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: 'fake-jwt-token',
      refreshToken: 'fake-refresh-token',
      expiresAt: '2026-12-31',
    });
  }

  // TODO: remove mock when backend is ready
  signUp(request: SignUpRequestDto): Observable<void> {
    const users = this.getMockUsers();
    const exists = users.find((u) => u.email === request.email);

    if (exists) {
      return throwError(() => ({ status: 409 }));
    }

    const newUser = {
      id: users.length + 1,
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName,
      role: request.role,
    };

    users.push(newUser);
    localStorage.setItem(this.MOCK_USERS_KEY, JSON.stringify(users));

    return of(void 0);
  }

  refreshToken(refreshToken: string): Observable<SignInResponseDto> {
    return this.http.post<SignInResponseDto>(
      `${this.baseUrl}/refresh-token`,
      { refreshToken },
      { headers: this.headers },
    );
  }

  private getMockUsers(): any[] {
    const data = localStorage.getItem(this.MOCK_USERS_KEY);
    return data ? JSON.parse(data) : [];
  }
}
