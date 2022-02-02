const nodemailer = require('nodemailer');
const {MAILER_PASS} = process.env;

const nodemailerConfig = {
    host: "mail.fabrikazig.com.ua",
    port: 465,
    secure: true,
    auth: {
        user: "ak@all-service.in.ua",
        pass: MAILER_PASS
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);



const sendEmailNodemailer = async (data) => {
    const email = {...data, from: "ak@all-service.in.ua"};
    try {
        await transporter.sendMail(email);
        return true;
    }

    catch(error) {
        throw error
    }
};

module.exports = sendEmailNodemailer;