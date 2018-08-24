const nodemailer = require('nodemailer');

exports.handler = (event, context, callback) => {
    console.log(event);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: "success"
    };

    const result = JSON.parse(event.body);
    const email= process.env.email;
    const password= process.env.password;

    var transporter = nodemailer.createTransport("smtps://"+email+":"+encodeURIComponent(password) + "@smtp.gmail.com:465");

    let mailOptions = {
        from: '"Perfect Intern Recruitment 👻" <aah1@mac.com>', // sender address
        to: 'aah1@mac.com', //list of receivers
        subject: 'Applicant: '+result.fullname, // Subject line
        html: `
        <p><strong>Full Name:&nbsp;</strong> ${result.fullname}</p>
        <p><strong>Email:&nbsp;</strong>${result.email}</p>
        <p><strong>Message:&nbsp;</strong>${result.message}</p>
        <p>Resume is Attached,</p>
        <p>Have a great day!</p>
        <hr />
        <p style="text-align: center;">www.PerfectIntern.com</p>
        `, // html body
        attachments: [
                {   // utf-8 string as an attachment
                    filename: `${result.fullname}Resume${result.fileFormat}`,
                    path: result.file,
                }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        callback(null, response);
    });
}
