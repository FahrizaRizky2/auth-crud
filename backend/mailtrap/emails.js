import {mailtrapClient, sender} from "./mailtrap.config.js";
import {VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{
        email
    }];
    try{
        const res = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("success", res)
    }catch (err) {
        console.error(`Error sending`, err);
        throw new Error(`Error sending verification email: ${err}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [
        {
            email
        }
    ];

    try{
    const res = await mailtrapClient.send({
                from: sender,
                to: recipient,
                template_uuid: "05869efb-c6bf-407e-bc27-53a0ca3034d6",
                template_variables: {
                    "company_info_name": "Fastsain",
                    "name": name,
                },
            });

        console.log("Welcome email sent successfully", res)
    }catch (err) {
        console.error(`Error sending`, err);
        throw new Error(`Error sending welcome email: ${err}`);
    }

};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{
        email
    }];
    try{
        const res = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Reset Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
        console.log("success", res)
    }catch (err) {
        console.error(`Error Sending Password Reset`, err);
        throw new Error(`Error Sending Password Reset: ${err}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{
        email
    }];
    try{
        const res = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Password Reset Sukses",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Success Password Reset"
        })
        console.log("success", res)
    }catch (err) {
        console.error(`Error Sending Reset Success`, err);
        throw new Error(`Error Sending Reset Success: ${err}`);
    }

};