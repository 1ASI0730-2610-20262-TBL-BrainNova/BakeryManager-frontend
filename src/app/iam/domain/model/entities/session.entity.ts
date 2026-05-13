export class Session {
  id: number;
  userId: number;
  token: string;
  refreshToken: string;
  issuedAt: Date;
  expiresAt: Date;
  isActive: boolean;

  constructor(
    id: number,
    userId: number,
    token: string,
    refreshToken: string,
    issuedAt: Date,
    expiresAt: Date,
    isActive: boolean = true
  ) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.refreshToken = refreshToken;
    this.issuedAt = issuedAt;
    this.expiresAt = expiresAt;
    this.isActive = isActive;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  invalidate(): void {
    this.isActive = false;
  }

  refresh(newToken: string, newExpiresAt: Date): void {
    this.token = newToken;
    this.expiresAt = newExpiresAt;
    this.issuedAt = new Date();
  }
}
