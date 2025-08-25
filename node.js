require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.render('portfolio.ejs');
});

// Contact form POST
app.post('/create', async (req, res) => {
    const { fullname, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email, // sender is the user
        to: process.env.EMAIL_USER, // your email
        subject: `Message from ${fullname}`,
        text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`
    };

try {
    await transporter.sendMail(mailOptions);
    res.send('Message sent successfully!');
} catch (err) {
    console.error('Error details:', err); // logs the exact reason
    res.status(500).send('Error sending message');
}
});

// Start servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));