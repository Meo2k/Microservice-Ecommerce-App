/**
 * External Services Interfaces
 */
import { Result } from "@org/shared";

export interface IEmailService {
    sendOtpToEmail(email: string, template: string): Promise<Result<void>>;
}

export interface IOtpService {
    checkOtpRestrictions(email: string): Promise<Result<void>>;
    findOtpByEmail(email: string): Promise<{ otp: string | null }>;
    handleFailedAttempts(email: string): Promise<Result<void>>;
    resetOTP(email: string): Promise<void>;
}
