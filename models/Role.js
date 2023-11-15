// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

const Role = database.define('Role', {
 
    Nom_Du_Role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    

})

export default Role