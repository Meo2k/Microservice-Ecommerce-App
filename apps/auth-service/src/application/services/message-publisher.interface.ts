import { IMessagePublisher } from '@org/message-broker';

export interface IAuthMessagePublisher extends IMessagePublisher {
    publishUserRegistered(email: string, username: string): Promise<void>;
}
