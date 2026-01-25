/**
 * OTP Service Interface
 * Defines contract for OTP operations
 */
export interface IOtpService {
    findOtpByEmail(to: string): Promise<{ otp: string | null }>;
    checkOtpRestrictions(to: string): Promise<void>;
    handleFailedAttempts(to: string): Promise<void>;
    resetOTP(to: string): Promise<void>;
}