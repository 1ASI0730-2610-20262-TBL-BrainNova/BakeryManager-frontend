import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';

import { SignInRequestDto } from '../../application/dtos/sign-in.request.dto';
import { SignInResponseDto } from '../../application/dtos/sign-in.response.dto';
import { SignUpRequestDto } from '../../application/dtos/sign-up.request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHttpService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';
  private readonly mockUrl = 'http://localhost:3000';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // TODO: remove mock when backend is ready
  signIn(request: SignInRequestDto): Observable<SignInResponseDto> {
    return this.http
      .get<any[]>(`${this.mockUrl}/users?email=${request.email}&password=${request.password}`)
      .pipe(
        map((users) => {
          if (!users || users.length === 0) {
            throw { status: 401 };
          }
          const user = users[0];
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: 'fake-jwt-token',
            refreshToken: 'fake-refresh-token',
            expiresAt: '2026-12-31',
          };
        }),
      );
  }

  // TODO: remove mock when backend is ready
  signUp(request: SignUpRequestDto): Observable<void> {
    return this.http.get<any[]>(`${this.mockUrl}/users?email=${request.email}`).pipe(
      switchMap((users) => {
        if (users && users.length > 0) {
          throw { status: 409 };
        }
        return this.http.post<void>(`${this.mockUrl}/users`, {
          firstName: request.firstName,
          lastName: request.lastName,
          email: request.email,
          password: request.password,
          role: request.role,
        });
      }),
      map(() => void 0),
    );
  }

  refreshToken(refreshToken: string): Observable<SignInResponseDto> {
    return this.http.post<SignInResponseDto>(
      `${this.baseUrl}/refresh-token`,
      { refreshToken },
      { headers: this.headers },
    );
  }
}
