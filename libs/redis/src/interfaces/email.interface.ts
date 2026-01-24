/**
 * Email Repository Interface
 * Defines contract for email-based OTP data operations
 */
export interface IEmailRepository {
    sendOtpToEmail(to: string, templateName: string): Promise<void>;
}