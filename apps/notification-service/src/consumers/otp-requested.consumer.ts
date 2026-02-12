import { BaseConsumer, OtpRequestedEvent, KafkaClient } from '@org/message-broker';
import { sendEmail, ENV } from '@org/shared/server';

export class OtpRequestedConsumer extends BaseConsumer<OtpRequestedEvent> {
    constructor(kafkaClient: KafkaClient) {
        super(kafkaClient, 'notification-service-otp-group', 'otp.requested');
    }

    async handleMessage(event: OtpRequestedEvent): Promise<void> {
        console.log(`📥 Received OTP request for ${event.email}`);

        try {
            const otpExpired = Number(ENV.OTP_EXPIRED) || 300;

            await sendEmail(
                event.email,
                "Xác thực Email của Bạn!",
                "Xác thực Email",
                "otp.template", // Ensure this template exists in libs/shared/src/templates/emails
                {
                    email: event.email,
                    otp: event.otp,
                    otpExpired: Math.floor(otpExpired / 60)
                }
            );

            console.log(`✅ OTP email sent successfully to ${event.email}`);
        } catch (error) {
            console.error(`❌ Failed to send OTP email to ${event.email}:`, error);
            // We might want to throw error to let Kafka retry? 
            // If it's a permanent error (e.g. invalid email), we shouldn't retry indefinitely.
            // For now, log and likely consume.
        }
    }
}
