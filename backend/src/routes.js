const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.get('/search', SearchController.index)
routes.delete('/devs/:github_username', DevController.delete)
routes.put('/devs/:github_username', DevController.update)

module.exports = routes