import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import dotenv from 'dotenv'
import database from "./connexion.js"
database.sync()
import routeVoitures from './routes/routeVoiture.js'
import routeSecurSalles from './routes/routeSeccursalle.js'
import routeRoles from './routes/routeRole.js'
import routeReservations from './routes/routeReservation.js'
import routeParkings from './routes/routeParking.js'
import routeMaintenances from './routes/routeMaintenance.js'
import routeLivraisons from './routes/routeLivraison.js'
import routeGarages from './routes/routeGarage.js'
import routeEmployes from './routes/routeEmploye.js'
import routeClients from './routes/routeClient.js'
import routeLogin from './routes/routeLogin.js'








const { PORT } = dotenv.config().parsed
const app = express()
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/salutation',(req,res)=>{
    res.send('Bonjour tout le monde')
})


//ajout des routes
app.use('/voiture',routeVoitures)
app.use('/login',routeLogin)
app.use('/employe',routeEmployes)
app.use('/maintenance',routeMaintenances)
app.use('/livraison',routeLivraisons)
app.use('/parking',routeParkings)
app.use('/seccursalle',routeSecurSalles)
app.use('/garage',routeGarages)
app.use('/client',routeClients)
app.use('/reservation',routeReservations)
app.use('/role',routeRoles)


app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`))