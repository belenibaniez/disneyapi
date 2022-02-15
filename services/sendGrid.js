const sgMail= require('@sendgrid/mail')

sgMail.setApiKey(process.env.KEY_SENDGRID)





module.exports= sgMail