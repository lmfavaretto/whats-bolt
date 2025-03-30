const express = require('express');
const app = express();
const { default: puppeteer } = require('puppeteer');

app.get('/', async (req, res) => {
  res.send('Servidor rodando!');
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});