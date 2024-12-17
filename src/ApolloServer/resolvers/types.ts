export type RoleType = {
    id: string;
    roleName: string;
};

export type UsersInEventType = {
    id: string;
    userName: string;
    emailId: string;
    password: string;
    avatar: string;
    puzzleLevel: number;
    matchesWon: number;
    eventsWon: number;
    score: number;
    role: RoleType;
};

export type EventType = {
    id: string;
    isPublicEvent:boolean;
    eventName: string;
    eventDescription: string;
    gameType: string;
    startDate: string;
    endDate: string;
    users: UsersInEventType[];
};

export type UserEventsQueryArgsType = {
    id: string;
};

export type QueryType = {
    userEvents: (args: UserEventsQueryArgsType) => EventType[];
};
