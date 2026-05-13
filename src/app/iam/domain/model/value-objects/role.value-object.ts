import { RoleType } from '../enums/role-type.enum';
import { PermissionType } from '../enums/permission-type.enum';

export class Role {
  readonly type: RoleType;
  readonly permissions: PermissionType[];

  private static readonly rolePermissions: Record<RoleType, PermissionType[]> = {
    [RoleType.OWNER]: [
      PermissionType.READ,
      PermissionType.WRITE,
      PermissionType.DELETE,
      PermissionType.MANAGE_USERS,
      PermissionType.MANAGE_SENSORS,
    ],
    [RoleType.ADMINISTRATOR]: [
      PermissionType.READ,
      PermissionType.WRITE,
      PermissionType.MANAGE_SENSORS,
    ],
    [RoleType.OPERATIONAL_STAFF]: [PermissionType.READ, PermissionType.WRITE],
  };

  constructor(type: RoleType) {
    this.type = type;
    this.permissions = Role.rolePermissions[type];
  }

  hasPermission(permission: PermissionType): boolean {
    return this.permissions.includes(permission);
  }

  getLabel(): string {
    const labels: Record<RoleType, string> = {
      [RoleType.OWNER]: 'Owner / Administrator',
      [RoleType.ADMINISTRATOR]: 'Branch Manager',
      [RoleType.OPERATIONAL_STAFF]: 'Operational Staff',
    };
    return labels[this.type];
  }

  getDashboardRoute(): string {
    const routes: Record<RoleType, string> = {
      [RoleType.OWNER]: '/inventory',
      [RoleType.ADMINISTRATOR]: '/inventory',
      [RoleType.OPERATIONAL_STAFF]: '/inventory',
    };
    return routes[this.type];
  }

  equals(other: Role): boolean {
    return this.type === other.type;
  }
}
