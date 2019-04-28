import { UserInputError } from 'apollo-server';

interface Arguments {
  name: string;
}

/**
 * Greet with name.
 * @param parent - Parent object.
 * @param name - Name to greet.
 * @returns Greeting message with name.
 */
export default function greet(parent: any, { name }: Arguments): string {
  if (!(name && name !== '')) {
    throw new UserInputError('Name is undefined. ');
  }

  return `Hello, ${name}!`;
}
