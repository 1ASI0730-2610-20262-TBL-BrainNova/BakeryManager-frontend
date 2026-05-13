import { RoleType } from '../../domain/model/enums/role-type.enum';

export interface SignUpRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleType;
}
