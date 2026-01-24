/**
 * OTP Repository Interface
 * Defines contract for OTP data operations and validation
 */
export interface IOtpRepository {
    findOtpByEmail(to: string): Promise<{ otp: string | null }>;
    checkOtpRestrictions(to: string): Promise<void>;
    handleFailedAttempts(to: string): Promise<void>;
    resetOTP(to: string): Promise<void>;
}