//Server to mimic APIs for desktop

const express = require('express');
const router = express.router;

const app = express();

const name = 'mock-api.desktop.local';
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`${name} listening on port ${port}`));
