
const venom = require('venom-bot');

venom
  .create({
    session: 'mvp-session',
    headless: true,
    useChrome: true,
    disableSpins: true,
    logQR: true,
    browserArgs: ['--no-sandbox'],
    executablePath: '/usr/bin/chromium'
  })
  .then((client) => start(client))
  .catch((err) => console.error(err));

function start(client) {
  client.onMessage(async (message) => {
    if (message.body === 'Oi' && message.isGroupMsg === false) {
      client.sendText(message.from, 'Olá! Como posso te ajudar?');
    }
  });
}
