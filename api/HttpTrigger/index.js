module.exports = async function (context, req) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'alec.harrison@workersway.org',
        from: 'alec.harrison@workersway.org',
        templateId: 'd-b1363779e07647929c70b72e99431b4e',
        dynamic_template_data: {
            fullName: req.body.fullname,
            email: req.body.email,
        },
      };
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    });
}