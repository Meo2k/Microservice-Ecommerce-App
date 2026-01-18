export interface IEmailService {
    sendOtpToEmail(to: string, templateName: string): Promise<void>;
    checkOtpRestrictions(to: string): Promise<void>;
    handleFailedAttempts(to: string): Promise<void>;
}