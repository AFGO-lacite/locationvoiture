// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

const Employe = database.define('Employe', {
 
    Nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Naissance: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Telephone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    Mot_De_Passe:{
        type:DataTypes.STRING,
        allowNull: false

    },
    Photo:{
        type:DataTypes.BLOB,
        allowNull: false

    },
 

})

export default Employe