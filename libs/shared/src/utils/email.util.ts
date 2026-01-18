import nodemailer from "nodemailer";
import { ENV } from "../config/env.config.js";
import path from "path";
import * as ejs from "ejs";

const transporter = nodemailer.createTransport({
    host: ENV.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS,
    },
});

const renderEmailTemplate = async (templateName: string, data: Record<string, any>) => {
    const templatePath = path.join(
        process.cwd(),
        "libs/shared/src/templates/emails",
        `${templateName}.ejs`
    )

    return ejs.renderFile(templatePath, data)

}

export const sendEmail = async (to: string, subject: string, text: string, templateName: string, data: Record<string, any>) => {
    const html = await renderEmailTemplate(templateName, data)
    await transporter.sendMail({
        from: ENV.EMAIL_USER,
        to,
        subject,
        text,
        html
    });
}