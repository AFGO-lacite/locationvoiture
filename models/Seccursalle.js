// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"


const SecurSalle = database.define('SecurSalle', {
    adresseDeLaSecurSalle: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default SecurSalle