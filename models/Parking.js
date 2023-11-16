// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"


const Parking = database.define('Parking', {
    couleurDuParking: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
});

export default Parking