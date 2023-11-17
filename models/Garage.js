// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

const GarageDeMaintenance = database.define('GarageDeMaintenance', {
    nomDuGarage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


export default GarageDeMaintenance