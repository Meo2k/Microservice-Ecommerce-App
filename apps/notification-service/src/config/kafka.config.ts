import { KafkaConfig } from '@org/message-broker';
import { ENV } from '@org/shared';

export const kafkaConfig: KafkaConfig = {
    brokers: ENV.KAFKA_BROKERS.split(','),
    clientId: ENV.KAFKA_CLIENT_ID,
    ssl: false, // Local Docker Kafka doesn't need SSL
};
