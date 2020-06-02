import express from 'express'

const HOST = '0.0.0.0'
const PORT = 3000

const app = express();

app.get('/helloworld', (req, res) => {
    res.json({ status: 'hello world!!'})
})

app.listen(PORT, HOST)