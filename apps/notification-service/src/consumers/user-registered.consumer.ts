import { KafkaClient, BaseConsumer } from '@org/message-broker';
import { UserRegisteredEvent } from '@org/message-broker';
import { EmailService } from '@org/redis';

export class UserRegisteredConsumer extends BaseConsumer<UserRegisteredEvent> {
    constructor(
        kafkaClient: KafkaClient,
        private emailService: EmailService
    ) {
        super(kafkaClient, 'notification-service-group', 'user.registered');
    }

    async handleMessage(event: UserRegisteredEvent): Promise<void> {
        console.log(`📥 Received event from topic "user.registered":`, event.eventType);

        try {
            // Send OTP email
            console.log(`📧 Sending OTP email to ${event.email}`);
            const result = await this.emailService.sendOtpToEmail(event.email, 'otp.template');

            if (result.isSuccess) {
                console.log(`✅ OTP email sent successfully to ${event.email}`);
            } else {
                console.error(`❌ Failed to send OTP email:`, result.error);
            }

            console.log(`✅ Successfully processed event: ${event.eventType}`);
        } catch (error) {
            console.error(`❌ Error processing event:`, error);
            throw error;
        }
    }
}
