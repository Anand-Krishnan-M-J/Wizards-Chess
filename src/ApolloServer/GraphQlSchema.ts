import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    userEvents(id: ID!): [Event!]!
  }

  type Event {
    id: ID!
    isPublicEvent: Boolean
    eventName: String!
    eventDescription: String!
    gameType: String!
    startDate: String!
    endDate: String!
    users: [UsersInEvent!]
  }

  type UsersInEvent {
    id: ID!
    userName: String!
    emailId: String!
    password: String!
    avatar: String!
    puzzleLevel: Int!
    matchesWon: Int!
    eventsWon: Int!
    score: Int!
    role: Role!
  }

  type Role {
    id: ID!
    roleName: String!
  }
`;
