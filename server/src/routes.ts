import { Router } from 'express'
import knex from './database/connections'

const routes = Router()


routes.get('/items', async (req, res) => {
    const items = await knex('items').select('*')

    const serializedItems = items.map( item => {
        return {
            title: item.title,
            image_url: `http://localhost:3000/uploads/${item.image}`
        }
    })

    res.json(serializedItems)
})

export default routes