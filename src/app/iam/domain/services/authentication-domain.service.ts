import { Injectable } from '@angular/core';
import { User } from '../model/entities/user.entity';
import { Role } from '../model/value-objects/role.value-object';
import { RoleType } from '../model/enums/role-type.enum';
import { PermissionType } from '../model/enums/permission-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationDomainService {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 8;
  }

  isTokenExpired(token: string): boolean {
    // TODO: remove when backend is ready
    if (token === 'fake-jwt-token') return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() > expiry;
    } catch {
      return true;
    }
  }

  extractRoleFromToken(token: string): RoleType | null {
    // TODO: remove when backend is ready
    if (token === 'fake-jwt-token') return RoleType.OWNER;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (payload.role as RoleType) ?? null;
    } catch {
      return null;
    }
  }

  extractUserIdFromToken(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub ? Number(payload.sub) : null;
    } catch {
      return null;
    }
  }

  canAccessRoute(user: User, requiredPermission: PermissionType): boolean {
    const role = new Role(user.role);
    return role.hasPermission(requiredPermission);
  }

  getDashboardRouteForRole(role: RoleType): string {
    const roleObj = new Role(role);
    return roleObj.getDashboardRoute();
  }

  buildUserFromToken(token: string): Partial<User> | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: Number(payload.sub),
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: payload.role as RoleType,
        isActive: true,
      };
    } catch {
      return null;
    }
  }
}
