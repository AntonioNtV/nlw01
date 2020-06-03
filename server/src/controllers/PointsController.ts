import { Request, Response } from 'express'
import knex from '../database/connections'

class PointsController {
    async create(req: Request, res: Response) {

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            adressNumber,
            items
        } = req.body
    
        const trx = await knex.transaction()

        const point = {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            adress_number: adressNumber,
            image: 'https://images.unsplash.com/photo-1561385945-c99789cd12d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
        }
    
        const insertedIds = await trx('points').insert(point)
        
        const point_id = insertedIds[0]

        const pointsItems = items.map( (item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
        
    
        const validItemsId = (await trx('items').select('id')).map( itemObject=> {
            return itemObject.id
        })
            
        if (items.every((item: number) => validItemsId.includes(item))) {
            await trx('points_items').insert(pointsItems)
        }
    
        await trx.commit()
    
        return res.json({ 
            point_id,
            ...point
         })

    }

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query

        const parsedItems = String(items)
        .split(',')
        .map( item => { return Number(item.trim()) })

        const points = await knex('points')
        .join('points_items', 'points.id', '=', 'points_items.point_id')
        .whereIn('points_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')


        return res.json(points)
    }

   async show (req: Request, res: Response) {
        const { id } = req.params

        const point = await knex('points').where('id', id).first()

        if (!point) {
            return res.status(400).json({ 'status': 'Point is not registered '})
        }

        const items = await knex('items')
        .join('points_items', 'items.id', '=', 'points_items.item_id')
        .where('points_items.point_id', id)
        .select('items.title').select('items.image')
        return res.json({
            ...point,
            items
        })

    }
}

export default new PointsController