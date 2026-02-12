import { IMessagePublisher } from '@org/message-broker';

export interface IAuthMessagePublisher extends IMessagePublisher {
    publishOtpRequested(email: string, otp: string): Promise<void>;
}
