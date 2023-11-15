// Importation du modèle Client
import {Client} from "../models/relation.js"; 
import {Reservation} from "../models/relation.js"; 

import validerClient from "../validation/ValidationClient.js";
import bcrypt from 'bcryptjs'

// Lister tous les Clients
export const lister_clients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            // Inclure les réservations si nécessaire
            include: [Reservation]
        });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un Client
export const ajouter_client = async (req, res) => {
    
    const { nom, prenom, dateDeNaissance, email, motDePasse, photo, telephone, adressePostale, numeroDePermis } = req.body;
        const errorsss= validerClient(req.body)
        if (errorsss !== true) {
            return res.status(400).json({ errorsss });  
        }
    try {
        
        const mdpCrypte=bcrypt.hashSync(motDePasse,10)
        
        
        const nouveauClient = await Client.create({ nom, prenom, dateDeNaissance, email, motDePasse:mdpCrypte, photo, telephone, adressePostale, numeroDePermis });
        res.status(201).json(nouveauClient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un Client
export const modifier_client = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        await client.update(updates);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un Client par son ID
export const recuperer_client = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id, {
            // Inclure les réservations si nécessaire
            include: [Reservation]
        });
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un Client
export const supprimer_client = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        await client.destroy();
        res.status(200).json({ message: "Client supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
