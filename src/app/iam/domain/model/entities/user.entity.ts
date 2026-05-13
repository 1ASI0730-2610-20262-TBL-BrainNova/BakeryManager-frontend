import { RoleType } from '../enums/role-type.enum';
import { PermissionType } from '../enums/permission-type.enum';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  role: RoleType;
  permissions: PermissionType[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: RoleType,
    permissions: PermissionType[] = [],
    isActive: boolean = true,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.permissions = permissions;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hasPermission(permission: PermissionType): boolean {
    return this.permissions.includes(permission);
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  updateProfile(firstName: string, lastName: string): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.updatedAt = new Date();
  }

  isOwner(): boolean {
    return this.role === RoleType.OWNER;
  }

  isAdministrator(): boolean {
    return this.role === RoleType.ADMINISTRATOR;
  }

  isOperationalStaff(): boolean {
    return this.role === RoleType.OPERATIONAL_STAFF;
  }
}
