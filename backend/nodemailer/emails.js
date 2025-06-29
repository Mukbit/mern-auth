import { transporter } from "./email.config.js";
import { CHANGE_PASSWORD_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {


    try {
        const response = await transporter.sendMail({
            from: '"ACS_Auth" <royalmukbit@gmail.com>',
            to: email,
            subject: "Verify your Email",
            text: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {


    try {
        const response = await transporter.sendMail({
            from: '"ACS_Auth" <royalmukbit@gmail.com>',
            to: email,
            subject: "Verify your Email",
            text: "Verify your Email",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: "Welcome Email"
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {


    try {
        const response = await transporter.sendMail({
            from: '"ACS_Auth" <royalmukbit@gmail.com>',
            to: email,
            subject: "Reset your Password",
            text: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {


    try {
        const response = await transporter.sendMail({
            from: '"ACS_Auth" <royalmukbit@gmail.com>',
            to: email,
            subject: "Password Reset Successful",
            text: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendChangePasswordSuccessEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: '"ACS_Auth" <royalmukbit@gmail.com>',
            to: email,
            subject: "Password Change Successful",
            text: "Password Change Successful",
            html: CHANGE_PASSWORD_SUCCESS_TEMPLATE,
            category: "Password Change"
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};