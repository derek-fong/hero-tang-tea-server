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

    console.log('Current user is: ');
    console.log(this.currentUser);

    // REVIEW: Caution with auth0's rate limit.
    // See: https://auth0.com/docs/policies/rate-limits#endpoints-with-rate-limits
    // Management API: 2 requests per second.
    // See Also: Authentication API:
    // this.currentUser = null;

    // console.log('[AUTH] Session received');
    // console.log(session);

    // console.log('[AUTH] Session request headers');
    // console.log(
    //   session && session.req ? session.req.headers : 'invalid session header'
    // );

    // const authHeader =
    //   session &&
    //   Object.prototype.hasOwnProperty.call(session, 'req') &&
    //   session.req &&
    //   Object.prototype.hasOwnProperty.call(session.req, 'headers') &&
    //   session.req.headers &&
    //   Object.prototype.hasOwnProperty.call(session.req.headers, 'authorization')
    //     ? session.req.headers.authorization
    //     : null;

    // if (authHeader && typeof authHeader === 'string' && authHeader !== '') {
    //   const authParts = (authHeader as string).split(' ');

    //   if (
    //     authParts &&
    //     authParts.length === 2 &&
    //     /^Bearer$/i.test(authParts[0]) &&
    //     authParts[1] &&
    //     typeof authParts[1] === 'string' &&
    //     authParts[1] !== ''
    //   ) {
    //     const token = authParts[1];

    //     console.log('[Auth] Token received: ');
    //     console.log(token);

    //     // this.currentUser = await this.getCurrentUserByTokenAsync(token);
    //     this.currentUser = { id: 'testId', permissions: ['products:read'] };
    //   } else {
    //     throw new AuthenticationError('Invalid token scheme. ');
    //   }
    // }
  }

  /**
   * Determine if current user has permission specified.
   * @param roles - List of roles to check against; Users are considered to be authorized if user contains at least one of the roles listed.
   * @returns `true` if user has permission; `false` otherwise.
   */
  hasPermission(roles: string[]): boolean {
    let hasPermission = false;

    if (!(roles && roles.constructor === Array && roles.length > 0)) {
      throw new Error(
        "Failed to check current user's permissions: Invalid roles provided. "
      );
    }

    if (
      this.currentUser &&
      this.currentUser.roles &&
      this.currentUser.roles.length > 0
    ) {
      const currentUserRoles = this.currentUser.roles;

      hasPermission = roles.some(role => currentUserRoles.includes(role));
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
