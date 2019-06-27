var nodeMailer = require('nodemailer');
var request = require('request');
var transporter = nodeMailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: 'AKIA2BP4DOXI4G22BSW4',
        pass: 'BB5Scmy6fQJIENNzhJTou3VDkapIwE1BzpZ3y6d5zGHg'
    }
});

module.exports.mail = function(req, res, next) {
    var options = {
        uri: `http://localhost:4000/template`,
        method: 'POST',
        json: { name: "Jon Snow",
            template: req.body.template
        } // All the information that needs to be sent
    };
    request(options, function (error, response, body) {
        var mainOptions = {
            from: '"Sass Project" r.lalnghenchhana@gmail.com',
            to: "kahrenang@gmail.com",
            subject: "Test mail",
            text: body,
            html: body,
        };
        console.log(body);
        transporter.sendMail(mainOptions, function (err, message) {
            console.log("test", err)
            res.json({"message" : "Sent"});
        });
    });
};


// function sendEmail(toEmail, subject, templateFile) {
//     var options = {
//         uri: `http://localhost:3000/template/email/${templateFile}`,
//         method: 'POST',
//         json: { name: "Jon Snow" } // All the information that needs to be sent
//     };
//     request(options, function (error, response, body) {
//         if (error) console.log(error)
//         var transporter = nodemailer.createTransport({
//             host: mailConfig.host,
//             port: mailConfig.port,
//             secure: true,
//             auth: {
//                 user: mailConfig.account,
//                 pass: mailConfig.password
//             }
//         })
//         var mailOptions = {
//             from: mailConfig.account,
//             to: toEmail,
//             subject: subject,
//             html: body
//         }
//         transporter.sendMail(mailOptions, function(error, info) {
//             if (error) console.log(error)
//         })
//     })
// }