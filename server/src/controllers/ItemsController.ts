import knex from '../database/connections'
import { Request, Response } from 'express'

class ItemsController {
    async index(req: Request, res: Response) {
        const items = await knex('items').select('*')

        const serializedItems = items.map( item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3000/uploads/${item.image}`
            }
        })
    
        res.json(serializedItems)
    }
}

export default new ItemsController