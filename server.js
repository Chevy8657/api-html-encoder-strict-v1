'use strict';
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '128kb' }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.post('/v1/encode', (req, res) => {
  const { input } = req.body;
  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Input must be a string.' });
  }

  const output = input.replace(/[\u00A0-\u9999<>\&]/g, (i) => {
    return '&#' + i.charCodeAt(0) + ';';
  });

  res.status(200).json({ output });
});

app.listen(process.env.PORT || 10000);
