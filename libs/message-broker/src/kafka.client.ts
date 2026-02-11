import { Kafka, Producer, Consumer, Admin, logLevel, Partitioners } from 'kafkajs';

export interface KafkaConfig {
    brokers: string[];
    clientId: string;
    username?: string;
    password?: string;
    ssl?: boolean;
}

class KafkaClient {
    private static instance: KafkaClient;
    private kafka: Kafka;
    private producer: Producer | null = null;
    private admin: Admin | null = null;

    private constructor(config: KafkaConfig) {
        const saslConfig = config.username && config.password
            ? {
                mechanism: 'plain' as const,
                username: config.username,
                password: config.password,
            }
            : undefined;

        this.kafka = new Kafka({
            clientId: config.clientId,
            brokers: config.brokers,
            ssl: config.ssl ?? false, // Default to false for local Docker Kafka
            sasl: saslConfig,
            logLevel: logLevel.INFO,
            retry: {
                initialRetryTime: 100,
                retries: 8,
            },
        });
    }

    public static getInstance(config?: KafkaConfig): KafkaClient {
        if (!KafkaClient.instance) {
            if (!config) {
                throw new Error('KafkaClient must be initialized with config on first call');
            }
            KafkaClient.instance = new KafkaClient(config);
        }
        return KafkaClient.instance;
    }

    public async getProducer(): Promise<Producer> {
        if (!this.producer) {
            this.producer = this.kafka.producer({
                allowAutoTopicCreation: true,
                createPartitioner: Partitioners.LegacyPartitioner,
                transactionTimeout: 30000,
            });
            await this.producer.connect();
            console.log('✅ Kafka Producer connected');
        }
        return this.producer;
    }

    public createConsumer(groupId: string): Consumer {
        return this.kafka.consumer({
            groupId,
            sessionTimeout: 30000,
            heartbeatInterval: 3000,
        });
    }

    public async getAdmin(): Promise<Admin> {
        if (!this.admin) {
            this.admin = this.kafka.admin();
            await this.admin.connect();
            console.log('✅ Kafka Admin connected');
        }
        return this.admin;
    }

    public async disconnect(): Promise<void> {
        if (this.producer) {
            await this.producer.disconnect();
            this.producer = null;
        }
        if (this.admin) {
            await this.admin.disconnect();
            this.admin = null;
        }
        console.log('✅ Kafka Client disconnected');
    }
}

export default KafkaClient;
export { KafkaClient };
