'use strict';

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
const transactionalInstance = new SibApiV3Sdk.TransactionalEmailsApi()

const sendMail = async (to, subject, template, data, event) => {
    let mail = {
        sender: {
            name:'myiDFi',
            email:process.env.BREVO_EMAIL,
        },
             // sender address
        to: [{email:to}], // list of receivers
        subject: subject, // Subject line
        htmlContent: template,
    };
    try{
        transactionalInstance.sendTransacEmail(mail).then(res => console.log("Success")).catch(err => console.log(err)) ;
        return;
    } catch (error) {
        logger.log('Error:' + error);
    }
};

const commonMailFunctionToAll = (dataToCompile, template) => {
    // if (dataToCompile.link) {
    //     let mailURL = null;
    //     if (process.env.NODE_ENV === 'development') {
    //         mailURL = process.env.DEVELOPMENT_WEB_URL + dataToCompile.link;
    //     } else if (process.env.NODE_ENV === 'staging') {
    //         mailURL = process.env.STAGING_WEB_URL + dataToCompile.link;
    //     } else {
    //         mailURL = process.env.PRODUCTION_WEB_URL + dataToCompile.link;
    //     }
    // }
    dataToCompile['link'] = dataToCompile.link;

    try {
        let filePath = path.resolve(__dirname + `/template/${template}.ejs`),
            compiled = ejs.compile(fs.readFileSync(filePath, 'utf8')),
            Subject = dataToCompile.subject;
        return sendMail(dataToCompile.email, Subject, compiled(dataToCompile));
    } catch (e) {
        logger.error(e);
    }
};


module.exports.sendMail = sendMail;
module.exports.commonMailFunctionToAll = commonMailFunctionToAll;
