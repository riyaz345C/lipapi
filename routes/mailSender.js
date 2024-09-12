const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
function objectToString(data){
    let result = ""
    for(let x in data){
        result = result+`${x} : ${data[x]}\n`
        }
    return result || 'no data'
}
router.post('/', async (req, res) => {
    // const { to, subject, text } = req.body;

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            // user: 'riyazaddbazar345@gmail.com',
            // pass: 'iqkghtlmrumuztle'
            user: 'enquirylandsindia@gmail.com',
            pass: 'kpivnrsonzqhiozk'
        }
    });

    // Define email options
    let mailOptions = {
        from: 'enquirylandsindia@gmail.com',
        to: 'enquirylandsindia@gmail.com',
        subject: 'subject',
        text: objectToString(req.body)
    };

    try {
        // Send the email
        // res.send(400)
        console.log('sending....',req.body, objectToString(req.body));
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

module.exports = router
