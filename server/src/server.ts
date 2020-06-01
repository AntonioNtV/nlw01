import express from 'express'

const app = express();

app.get('/helloworld', (req, res) => {
    res.json({ status: 'hello world!'})
})

app.listen(3333)