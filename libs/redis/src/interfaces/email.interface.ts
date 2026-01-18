
export interface IEmailService {
    sendOtpToEmail(to: string, templateName: string): Promise<void>;
   
}