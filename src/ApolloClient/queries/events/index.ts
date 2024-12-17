// queries/events.js
import { gql } from '@apollo/client';

export const GET_USER_EVENTS = gql`
  query GetUserEvents($id: ID!) {
    userEvents(id: $id) {
      id
      isPublicEvent
      eventName
      eventDescription
      gameType
      startDate
      endDate
    }
  }
`;
