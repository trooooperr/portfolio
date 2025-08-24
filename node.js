const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('portfolio.ejs');
});

app.post('/create', async function(req, res) {
    const { fullname, email, message } = req.body;

    // Configure your mail transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or "hotmail", "yahoo" etc.
        auth: {
            user: "yourgmail@gmail.com", // your email
            pass: "your-app-password"    // app password, not normal password
        }
    });

    // Email options
    let mailOptions = {
        from: email,
        to: "yourgmail@gmail.com", // where you want to receive details
        subject: `New Contact Form Submission from ${fullname}`,
        text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        res.redirect('/');
    } catch (error) {
        console.error("❌ Error sending email: ", error);
        res.send("Error sending email");
    }
});

app.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
});