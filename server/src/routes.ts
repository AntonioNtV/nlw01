import { Router } from 'express'
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'
import knex from './database/connections'

const routes = Router()


//points
routes.get('/points', PointsController.index)
routes.get('/points/:id', PointsController.show)
routes.post('/points', PointsController.create)


//items
routes.get('/items', ItemsController.index)

//test route
routes.get('/points_items', async (req, res) => {
    const pointsItems = await knex('points_items').select('*')

    res.json(pointsItems)
})

export default routes