const sgMail = require('@sendgrid/mail');
const {SENDGRID_KEY} = process.env;

sgMail.setApiKey(SENDGRID_KEY);


const sendEmail = async (data) => {
    const email = {...data, from: "ak@all-service.in.ua"};

    try {
        await sgMail.send(email)
        return true;
    }
    catch (err) {
        throw err;
    }
}


module.exports = sendEmail;