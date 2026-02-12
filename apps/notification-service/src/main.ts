import * as dotenv from 'dotenv';
// Load environment variables FIRST
dotenv.config();

import 'reflect-metadata';
import { KafkaClient } from '@org/message-broker';
import { kafkaConfig } from './config/kafka.config.js';
import { OtpRequestedConsumer } from './consumers/otp-requested.consumer.js';

async function bootstrap() {
    console.log('🚀 Starting Notification Service...');

    try {
        // Initialize Kafka Client
        const kafkaClient = KafkaClient.getInstance(kafkaConfig);

        // Initialize Consumers
        const otpRequestedConsumer = new OtpRequestedConsumer(kafkaClient);

        // Start Consumers
        await otpRequestedConsumer.start();

        console.log('✅ Notification Service started successfully');

        // Graceful Shutdown
        const shutdown = async () => {
            console.log('⚠️ Shutting down Notification Service...');
            try {
                await otpRequestedConsumer.stop();
                await kafkaClient.disconnect();
                console.log('✅ Notification Service shutdown complete');
                process.exit(0);
            } catch (error) {
                console.error('❌ Error during shutdown:', error);
                process.exit(1);
            }
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

    } catch (error) {
        console.error('❌ Failed to start Notification Service:', error);
        process.exit(1);
    }
}

bootstrap();