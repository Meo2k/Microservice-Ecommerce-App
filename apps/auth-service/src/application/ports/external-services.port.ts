/**
 * Port interface for Email service
 * Application layer defines what it needs, infrastructure implements
 */
export interface IEmailService {
    sendOtpToEmail(email: string, template: string): Promise<void>;
}

/**
 * Port interface for OTP service
 */
export interface IOtpService {
    checkOtpRestrictions(email: string): Promise<void>;
    findOtpByEmail(email: string): Promise<{ otp: string | null }>;
    handleFailedAttempts(email: string): Promise<void>;
    resetOTP(email: string): Promise<void>;
}
