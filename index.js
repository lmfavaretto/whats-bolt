
const express = require('express');
const { create } = require('venom-bot');

const app = express();
const PORT = process.env.PORT || 8080;

let qrCodeBase64 = null;

create({
  session: 'mvp-session',
  multidevice: true,
  headless: true,
  disableWelcome: true,
  useChrome: false,
})
  .then((client) => {
    console.log('✅ Cliente conectado');
    start(client);
  })
  .catch((erro) => {
    console.error('❌ Erro ao iniciar o cliente:', erro);
  });

function start(client) {
  app.get('/send', async (req, res) => {
    const { phone, msg } = req.query;
    if (!phone || !msg) return res.send('Parâmetros ausentes');
    await client.sendText(`${phone}@c.us`, msg);
    res.send('Mensagem enviada');
  });
}

app.get('/qr', (req, res) => {
  if (!qrCodeBase64) return res.send('QR Code não gerado ainda');
  res.send(`<img src="${qrCodeBase64}" />`);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
