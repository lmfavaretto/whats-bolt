
const express = require('express');
const { create } = require('@wppconnect-team/wppconnect');

const app = express();
const port = process.env.PORT || 8080;

let clientInstance;

create({
  session: 'mvp-session',
  catchQR: (base64Qr, asciiQR) => {
    console.log('QR RECEIVED', asciiQR);
    global.qrCode = base64Qr;
  },
  headless: true,
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
}).then((client) => {
  clientInstance = client;
  console.log('WhatsApp client ready');
});

app.get('/qr', (req, res) => {
  if (global.qrCode) {
    res.send(`<img src="${global.qrCode}" />`);
  } else {
    res.send('QR code not yet generated. Please wait.');
  }
});

app.get('/send', async (req, res) => {
  const number = req.query.number;
  const message = req.query.message;

  if (!number || !message) {
    return res.status(400).send('Missing number or message');
  }

  try {
    await clientInstance.sendText(`${number}@c.us`, message);
    res.send('Message sent!');
  } catch (err) {
    res.status(500).send('Failed to send message');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
