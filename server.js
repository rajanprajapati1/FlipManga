// server.js
const next = require('next');
const express = require('express');
const scheduleNewsletterJob = require('./services/cronJob'); // Import cron job

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Run the cron job
  scheduleNewsletterJob(); // Start the cron job for newsletter

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
