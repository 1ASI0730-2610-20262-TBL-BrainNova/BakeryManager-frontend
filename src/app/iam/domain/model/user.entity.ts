import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Domain entity representing an account in the IAM bounded context.
 * @author Jareth Vidal Malaga
 */
export class User implements BaseEntity {
  private _id: number;
  private _username: string;

  /**
   * Creates a new user entity.
   * @param props - Immutable initialization values.
   */
  constructor(props: { id: number; username: string }) {
    this._id = props.id;
    this._username = props.username;
  }

  /**
   * Gets the ID of the user.
   * @returns The ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the ID of the user.
   * @param value The new ID.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the username of the user.
   * @returns The username.
   */
  get username(): string {
    return this._username;
  }

  /**
   * Sets the username of the user.
   * @param value The new username.
   */
  set username(value: string) {
    this._username = value;
  }
}
