const mailer = require("nodemailer");

const mail = (email)=>{
    return true;
}

let sendEmail = (receiver_email,firstName,newPassword)=>{
    let sender_email = "allaboucatapp@gmail.com";
    let transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth:{
            user: sender_email,
            pass: "atsynshqnnukiyju"
        }
    })

    let options = {
        from: sender_email,
        to: receiver_email,
        subject: "Password reset",
        html:` <!DOCTYPE html>
                <html>
                <body>
                <div>
                    <h3>Hello ${firstName}.</h3>
                    <p>You have received this email following your password reset request on allaboutcat platform.</p>
                    <p>Use the following password to login back</p>
                    <p><h2>${newPassword}</h2></p>
                </div>
                </body>
                </html>`,
    }

    transporter.sendMail(options,
        function(error,info){
            if(error){
                console.log(`Failed to send with error ${error}`);
                return false;
            }
            else{
                return true;
            }
        })
}

module.exports = {
    mail,
    sendEmail
}
