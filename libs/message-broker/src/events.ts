// Event type definitions for the message broker
export interface BaseEvent {
    eventType: string;
    timestamp: Date;
}

export interface UserRegisteredEvent extends BaseEvent {
    eventType: 'user.registered';
    email: string;
    username: string;
}

// Union type of all events
export type DomainEvent = UserRegisteredEvent;

// Topic names
export const Topics = {
    USER_REGISTERED: 'user.registered',
} as const;
