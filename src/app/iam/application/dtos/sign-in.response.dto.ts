import { RoleType } from '../../domain/model/enums/role-type.enum';

export interface SignInResponseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  token: string;
  refreshToken: string;
  expiresAt: string;
}
