import {
  ModuleConfig,
  ModuleSessionInfo,
  OnRequest,
} from '@graphql-modules/core';
import { Injectable, ProviderScope, Inject } from '@graphql-modules/di';
import { AuthenticationError } from 'apollo-server-express';

@Injectable({
  scope: ProviderScope.Session,
})
export class AuthProvider implements OnRequest {
  private currentUser: any;

  /**
   * Graphql Module's `OnRequest` hook.
   * Executes on each HTTP GraphQL request.
   * @see https://graphql-modules.com/docs/introduction/dependency-injection#onrequest-hook
   */
  async onRequest({ session }: ModuleSessionInfo): Promise<void> {
    // REVIEW: Caution with auth0's rate limit.
    // See: https://auth0.com/docs/policies/rate-limits#endpoints-with-rate-limits
    // Management API: 2 requests per second.
    // See Also: Authentication API:
    this.currentUser =
      session &&
      Object.prototype.hasOwnProperty.call(session, 'req') &&
      session.req
        ? session.req.user
        : null;

    console.log('Current User: ');
    console.log(this.currentUser);
  }

  /**
   * Determine if current user has permission specified.
   * @param permissions - List of permissions to check against; Users are considered to be authorized if user contains at least one of the permissions listed.
   * @returns `true` if user has permission; `false` otherwise.
   */
  hasPermission(permissions: string[]): boolean {
    let hasPermission = false;

    if (
      !(
        permissions &&
        permissions.constructor === Array &&
        permissions.length > 0
      )
    ) {
      throw new Error(
        "Failed to check current user's permissions: Invalid permissions provided. "
      );
    }

    if (
      this.currentUser &&
      this.currentUser.permissions &&
      this.currentUser.permissions.length > 0
    ) {
      const currentUserPermissions = this.currentUser.permissions;

      hasPermission = permissions.some(permission =>
        currentUserPermissions.includes(permission)
      );
    }

    return hasPermission;
  }

  /**
   * Determine if current user is authenticated.
   * @returns `true` if current user is authenticated; `false` otherwise.
   */
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
