const nodemailer = require("nodemailer");
// const previewEmail = require("preview-email");

module.exports = {
  sendEmail: async (to, subject, html) => {
    // const acc = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.NODE_MAILER_USER, // acc.user
        pass: process.env.NODE_MAILER_PASSWORD, // acc.pass
        credentials: {
          user: process.env.NODE_MAILER_USER, // acc.user
          pass: process.env.NODE_MAILER_PASSWORD, // acc.pass
        },
      },
    });
    const message = {
      from: '"Users API 👻" <userapi@example.com>',
      to,
      subject,
      html,
    };
    // await previewEmail(message).then(console.log).catch(console.error);
    await transporter
      .sendMail(message)
      .then((info) => {
        console.log(info.messageId);
      })
      .catch((error) => console.log(error));
  },
};
