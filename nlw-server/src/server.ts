import express from 'express';

const app = express();

app.get('/bbmp', (req, res) => {
    return res.send('Hello World!');
})

app.listen(3333, () => {
    console.log('HTTP Server started on port 3333');
})