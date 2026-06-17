import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Infrastructure resource contract describing a user from IAM endpoints.
 * @author Jareth Vidal Malaga
 */
export interface UserResource extends BaseResource {
  id: number;
  username: string;
}

/**
 * Infrastructure response envelope for user collection queries.
 * @author Jareth Vidal Malaga
 */
export interface UsersResponse extends BaseResponse {
  users: UserResource[];
}
