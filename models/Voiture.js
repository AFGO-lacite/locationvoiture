// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

const Voiture = database.define('Voiture', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Marque: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Modele: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Type_de_voiture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Annee_de_fabrication: {
        type: DataTypes.INTEGER,
    },
    Disponibilite:{
        type:DataTypes.BOOLEAN,
    },
    Prix_par_jour:{
        type:DataTypes.DECIMAL,

    }

})

export default Voiture