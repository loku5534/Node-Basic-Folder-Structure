var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { getOtpCode } = require("./otpGenerator");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});


const sendEmail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


const sendOtp = (businessName, otpToSend) => {
    return `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
            <tr>
                <td bgcolor="black" align="center" style="padding: 10px 0;">
                    <h1 style="color: #ffffff;">ASYRUS</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p>Hello ${businessName},</p>
                    <p style="padding-bottom: 20px;">Here is the OTP to claim your Business Account.</p>
                    <p align="center" style="padding-bottom: 20px;">
                        ${otpToSend}
                    </p>
                    <p style="padding-bottom: 20px;">Enter the OTP in to Asyrus App.</p>
                    <p>If you have any questions or need assistance, please don't hesitate to contact our support team
                        at support@asyrus.com.</p>
                    <p>Thank you for choosing ASYRUS!</p>
                </td>
            </tr>
            <tr>
                <td bgcolor="black" align="center" style="padding: 20px 0;">
                    <p style="color: #ffffff; font-size: 15px;">© 2023 ASYRUS. All rights reserved.</p>
                </td>
            </tr>
        </table>
        </body>`;
}



const passwordChangeEmail = (name, password) => {
    return `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
            <tr>
                <td bgcolor="black" align="center" style="padding: 10px 0;">
                    <h1 style="color: #ffffff;">ASYRUS</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p>Hello ${name},</p>
                    <p style="padding-bottom: 20px;">Your account password has been resseted:</p>
                    <h3>Your new password is </h3>
                    <h4 style="color:green">${password}</h4>
                    <p style="padding-bottom: 20px;">Please use this password to Login and make sure to update it from App's settings.</p>
                    <p>If you have any questions or need assistance, please don't hesitate to contact our support team
                        at support@asyrus.com.</p>
                    <p>Thank you for choosing ASYRUS!</p>
                </td>
            </tr>
            <tr>
                <td bgcolor="black" align="center" style="padding: 20px 0;">
                    <p style="color: #ffffff; font-size: 15px;">© 2023 ASYRUS. All rights reserved.</p>
                </td>
            </tr>
        </table>
        </body>`;
}

module.exports = {
    sendEmail,
    passwordChangeEmail,
    sendOtp,
}