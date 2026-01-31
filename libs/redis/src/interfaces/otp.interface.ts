/**
 * OTP Service Interface
 * Defines contract for OTP operations
 */
import { Result } from "@org/shared";

export interface IOtpService {
    findOtpByEmail(to: string): Promise<{ otp: string | null }>;
    checkOtpRestrictions(to: string): Promise<Result<void>>;
    handleFailedAttempts(to: string): Promise<Result<void>>;
    resetOTP(to: string): Promise<void>;
}