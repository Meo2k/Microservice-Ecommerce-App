import { MessagePublisher, Topics, UserRegisteredEvent, KafkaClient } from '@org/message-broker';
import { IAuthMessagePublisher } from '../../application/services/message-publisher.interface.js';

export class AuthMessagePublisher implements IAuthMessagePublisher {
    private messagePublisher: MessagePublisher;

    constructor(kafkaClient: KafkaClient) {
        this.messagePublisher = new MessagePublisher(kafkaClient);
    }

    async publish(topic: string, event: any): Promise<void> {
        return this.messagePublisher.publish(topic, event);
    }

    async publishUserRegistered(email: string, username: string): Promise<void> {
        const event: UserRegisteredEvent = {
            eventType: 'user.registered',
            email,
            username,
            timestamp: new Date(),
        };

        await this.messagePublisher.publish(Topics.USER_REGISTERED, event);
    }
}
