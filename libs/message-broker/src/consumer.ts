import { Consumer, EachMessagePayload } from 'kafkajs';
import KafkaClient from './kafka.client.js';
import { DomainEvent } from './events.js';

export abstract class BaseConsumer<T extends DomainEvent> {
    protected consumer: Consumer;

    constructor(
        kafkaClient: KafkaClient,
        private groupId: string,
        private topic: string
    ) {
        this.consumer = kafkaClient.createConsumer(groupId);
    }

    abstract handleMessage(event: T): Promise<void>;

    async start(): Promise<void> {
        try {
            await this.consumer.connect();
            console.log(`✅ Consumer connected: ${this.groupId}`);

            await this.consumer.subscribe({
                topic: this.topic,
                fromBeginning: false,
            });

            await this.consumer.run({
                eachMessage: async (payload: EachMessagePayload) => {
                    try {
                        const { message } = payload;
                        const event = JSON.parse(message.value?.toString() || '{}') as T;

                        console.log(`📥 Received event from topic "${this.topic}":`, event.eventType);

                        await this.handleMessage(event);

                        console.log(`✅ Successfully processed event:`, event.eventType);
                    } catch (error) {
                        console.error(`❌ Error processing message:`, error);
                        // In production, you might want to send to a dead letter queue
                        throw error;
                    }
                },
            });
        } catch (error) {
            console.error(`❌ Consumer error:`, error);
            throw error;
        }
    }

    async stop(): Promise<void> {
        await this.consumer.disconnect();
        console.log(`✅ Consumer disconnected: ${this.groupId}`);
    }
}
