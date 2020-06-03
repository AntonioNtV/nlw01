import express from 'express'
import cors from 'cors'
import routes from './routes'
import knex from 'knex'
import path from 'path'

class App {
    public express: express.Application

    public constructor () {
        this.express = express()

        this.middlewares()
        this.routes()
    }

    private middlewares() {
        this.express.use(cors())
        this.express.use(express.json())
    }

    private routes() {
        this.express.use(routes)
    }

    
}

export default new App().express