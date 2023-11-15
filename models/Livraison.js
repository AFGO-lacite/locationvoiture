// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

const Livraison = database.define('Livraison', {
    dateLivraison: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    adresseLivraison: {
        type: DataTypes.STRING,
        allowNull: false
    },
    heureLivraison: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

export default Livraison