// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"




// Modèle Client
const Client = database.define('Clients', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateDeNaissance: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    motDePasse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adressePostale: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroDePermis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Vous pouvez ajouter d'autres attributs spécifiques aux clients ici
});


export default Client
