import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SignInRequestDto } from '../../application/dtos/sign-in.request.dto';
import { SignInResponseDto } from '../../application/dtos/sign-in.response.dto';
import { SignUpRequestDto } from '../../application/dtos/sign-up.request.dto';
import { RoleType } from '../../domain/model/enums/role-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHttpService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  signIn(request: SignInRequestDto): Observable<SignInResponseDto> {
    // TODO: remove mock when backend is ready
    return of({
      id: 1,
      email: request.email,
      firstName: 'Luis',
      lastName: 'Tufiño',
      role: RoleType.OWNER,
      token: 'fake-jwt-token',
      refreshToken: 'fake-refresh-token',
      expiresAt: '2026-12-31',
    });
  }

  signUp(request: SignUpRequestDto): Observable<void> {
    // TODO: remove mock when backend is ready
    return of(void 0);
  }

  refreshToken(refreshToken: string): Observable<SignInResponseDto> {
    return this.http.post<SignInResponseDto>(
      `${this.baseUrl}/refresh-token`,
      { refreshToken },
      { headers: this.headers },
    );
  }
}
