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

module.exports.send = function(send_to,Subject,body) {
    var options = {
        uri: `http://localhost:4000/template`,
        method: 'POST',
        json: { name: "Jon Snow",
            template: "email"
        } // All the information that needs to be sent
    };
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        var mainOptions = {
            from: '"Sass Project" r.lalnghenchhana@gmail.com',
            to: "kahrenang@gmail.com",
            subject: "Test mail",
            attachment:[],
            text: body,
            html: body,
        };
        console.log(body);
        transporter.sendMail(mainOptions, function (err, message) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Sent");
        });
    });
};