import { Router } from 'express'

const routes = Router()

routes.get('/helloworld', (req, res) => {
    res.json({
        "message": "hello"
    })
})

export default routes