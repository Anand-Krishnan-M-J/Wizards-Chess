import { QueryType } from './types';
import { getUserEvents } from '../models/events';
export const resolvers = {
  Query: {
    userEvents: async (_: QueryType, { id }: { id: string }) => {
      const { data } = await getUserEvents(id);
      return data;
    },
  },
  // Mutation: async () => {
  //     return [""];
  // },
};
