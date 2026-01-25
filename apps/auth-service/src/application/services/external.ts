/**
 * External Services Interfaces
 */
export interface IEmailService {
    sendOtpToEmail(email: string, template: string): Promise<void>;
}

export interface IOtpService {
    checkOtpRestrictions(email: string): Promise<void>;
    findOtpByEmail(email: string): Promise<{ otp: string | null }>;
    handleFailedAttempts(email: string): Promise<void>;
    resetOTP(email: string): Promise<void>;
}
