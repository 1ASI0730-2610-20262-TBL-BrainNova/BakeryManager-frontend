/**
 * Infrastructure request contract sent to the sign-up endpoint.
 * @author Jareth Vidal Malaga
 */
export interface SignUpRequest {
  /** Username for the new account. */
  username: string;
  /** Raw password for the new account. */
  password: string;
}
