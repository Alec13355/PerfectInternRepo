module.exports = async function (context, req) {
    const sgMail = require('@sendgrid/mail')
    
    const myArray = req.body.file.split("data:application/pdf;base64,");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'alec.harrison@workersway.org',
        from: 'alec.harrison@workersway.org',
        templateId: 'd-511378354afc40a084cc1ddb49cf66b8',
        dynamic_template_data: {
            fullName: req.body.fullname,
            email: req.body.email,
            message: req.body.message,
        },
        attachments: [
            {
              content: myArray[1],
              filename: `${req.body.fullname}Resume${req.body.fileFormat}`,
              type: "application/pdf",
              disposition: "attachment"
            }
        ]
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