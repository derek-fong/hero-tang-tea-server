import scalars from './scalars';

export default {
  Person: {
    __resolveType() {
      return null;
    },
  },
  ...scalars,
};
