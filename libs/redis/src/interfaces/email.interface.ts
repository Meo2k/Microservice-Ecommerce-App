/**
 * Email Service Interface
 * Defines contract for email operations
 */
export interface IEmailService {
    sendOtpToEmail(to: string, templateName: string): Promise<void>;
}