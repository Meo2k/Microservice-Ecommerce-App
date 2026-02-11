import { Producer } from 'kafkajs';
import KafkaClient from './kafka.client.js';
import { DomainEvent } from './events.js';

export interface IMessagePublisher {
    publish(topic: string, event: DomainEvent): Promise<void>;
}

export class MessagePublisher implements IMessagePublisher {
    private producer: Producer | null = null;

    constructor(private kafkaClient: KafkaClient) { }

    private async getProducer(): Promise<Producer> {
        if (!this.producer) {
            this.producer = await this.kafkaClient.getProducer();
        }
        return this.producer;
    }

    async publish(topic: string, event: DomainEvent): Promise<void> {
        try {
            const producer = await this.getProducer();

            await producer.send({
                topic,
                messages: [
                    {
                        key: event.eventType,
                        value: JSON.stringify(event),
                        timestamp: event.timestamp.getTime().toString(),
                    },
                ],
            });

            console.log(`📤 Published event to topic "${topic}":`, event.eventType);
        } catch (error) {
            console.error(`❌ Failed to publish event to topic "${topic}":`, error);
            throw new Error(`Failed to publish event: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
