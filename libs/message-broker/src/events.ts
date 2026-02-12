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

export interface OtpRequestedEvent extends BaseEvent {
    eventType: 'otp.requested';
    email: string;
    otp: string;
}

// Union type of all events
export type DomainEvent = UserRegisteredEvent | OtpRequestedEvent;

// Topic names
export const Topics = {
    USER_REGISTERED: 'user.registered',
    OTP_REQUESTED: 'otp.requested',
} as const;
