import { getUserEvents } from '../models/events'
import { QueryType } from './types'
export const resolvers = {
    Query: {
        userEvents: async (_: QueryType, { id }: { id: string }) => {
            const { data } = await getUserEvents(id)
            return data
        },
    }
    // Mutation: async () => {
    //     return [""];
    // },
}
