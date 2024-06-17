const express = require('express');

const app = express();

const port = 3001;

app.get('/', (req, res) => {
    res.status(200).json({name: 'jake', message: 'sending some JSON'});
});

app.post('/', (req, res) => {
    res.status(200).send('now it\'s postable');
});

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});