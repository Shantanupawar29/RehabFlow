require('dotenv').config({ path: '../../.env' }); // Go up 2 levels from backend/tet // or absolute path like 'D:/RehabFlow/.env' // Adjust path if needed
const nodemailer = require('nodemailer');

console.log('Using email:', process.env.EMAIL); // Verify loading

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// Test connection first
transporter.verify((error, success) => {
  if (error) {
    console.error('Server verification failed:', error);
  } else {
    console.log('Server is ready to send messages');
    sendTestEmail();
  }
});

function sendTestEmail() {
  transporter.sendMail({
    from: process.env.EMAIL,
    to: 'shantanupawar2005@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email from our app'
  }, (err, info) => {
    if (err) {
      console.error('Error sending:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}