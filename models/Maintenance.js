// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

// Création de la table intermédiaire Maintenance
const Maintenance = database.define('Maintenanceee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TypeDeMaintenance: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DateDeDebut: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    DateDeFin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
    
});

export default Maintenance