import { ModuleContext } from '@graphql-modules/core';
import { ForbiddenError } from 'apollo-server-express';

import { AuthProvider } from '../../providers/auth.provider';

/**
 * Validate if current user has permission to proceed with the request.
 * @param roles - List of roles to validate.
 */
export const hasPermission = (roles: string[]): any => (
  next: any
): any => async (
  root: any,
  args: any,
  context: ModuleContext,
  info: any
): Promise<any> => {
  if (!context.injector.get(AuthProvider).hasPermission(roles)) {
    throw new ForbiddenError('Permissions required. ');
  }

  return next(root, args, context, info);
};
