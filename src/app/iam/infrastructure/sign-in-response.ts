import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Infrastructure resource contract returned by the sign-in endpoint.
 * @author Jareth Vidal Malaga
 */
export interface SignInResource extends BaseResource {
  id: number;
  username: string;
  token: string;
}

/**
 * Infrastructure response contract returned by the sign-in endpoint.
 * @author Jareth Vidal Malaga
 */
export interface SignInResponse extends BaseResponse, SignInResource {}
