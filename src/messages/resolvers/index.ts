import greetResolver from './queries/greet.resolver';
import messageResolver from './queries/message.resolver';

export default {
  Query: {
    greet: greetResolver,
    message: messageResolver
  }
};
