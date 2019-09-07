import {
  hasPermission,
  isAuthenticated,
} from '../../auth/shared/resolver-guards';

export const resolversComposition = {
  'Query.testMessage': [
    isAuthenticated(),
    // hasPermission(['products:read']),
  ],
};
