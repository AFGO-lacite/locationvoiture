// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

const Reservation = database.define('Reservation', {

    Date_de_debut_de_la_reservation:{
        type:DataTypes.STRING,

    },
    Date_de_fin_de_la_reservation:{
        type:DataTypes.STRING,

    },
    Cout:{
        type:DataTypes.DECIMAL,
    },
    
    Livraison:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    }


})

export default Reservation