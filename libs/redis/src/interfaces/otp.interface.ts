export interface IOtpService {
    findOtpByEmail(to: string): Promise<{otp: string | null}>;
    checkOtpRestrictions(to: string): Promise<void>;
    handleFailedAttempts(to: string): Promise<void>;
}