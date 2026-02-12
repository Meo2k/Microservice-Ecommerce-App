import { MessagePublisher, Topics, OtpRequestedEvent, KafkaClient } from '@org/message-broker';
import { IAuthMessagePublisher } from '../../application/services/message-publisher.interface.js';

export class AuthMessagePublisher implements IAuthMessagePublisher {
    private messagePublisher: MessagePublisher;

    constructor(kafkaClient: KafkaClient) {
        this.messagePublisher = new MessagePublisher(kafkaClient);
    }

    async publish(topic: string, event: any): Promise<void> {
        return this.messagePublisher.publish(topic, event);
    }

    async publishOtpRequested(email: string, otp: string): Promise<void> {
        const event: OtpRequestedEvent = {
            eventType: 'otp.requested',
            email,
            otp,
            timestamp: new Date()
        };

        await this.messagePublisher.publish(Topics.OTP_REQUESTED, event);
    }
}
