const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const app = express();
const port = process.env.PORT || 8080;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

let qrCodeData = '';

client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
        qrCodeData = url;
    });
});

client.on('ready', () => {
    console.log('✅ Cliente está pronto!');
});

client.initialize();

app.get('/qr', (req, res) => {
    if (qrCodeData) {
        res.send(`<img src="${qrCodeData}" />`);
    } else {
        res.send('QR Code não gerado ainda...');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});