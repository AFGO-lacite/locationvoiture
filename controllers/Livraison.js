// Importation des modèles nécessaires
import {Livraison} from "../models/relation.js"; 
import {Reservation} from "../models/relation.js"; 
import {Voiture} from "../models/relation.js"; 
import {Employe} from "../models/relation.js"; 
import{Client}from"../models/relation.js";
import validerLivraison from "../validation/ValidationLivraison.js";

// Lister toutes les Livraisons
export const lister_livraisons = async (req, res) => {
    try {
        const livraisons = await Livraison.findAll({
            include: [Client, Voiture, Employe,]
        });
        res.status(200).json(livraisons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter une Livraison
export const ajouter_livraison = async (req, res) => {
    const { dateLivraison, adresseLivraison, heureLivraison, ReservationId, VoitureId, EmployeId, ClientId } = req.body;
    const errors=validerLivraison(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
    try {

        // Vérifier si la réservation existe
        const reservation = await Reservation.findByPk(ReservationId);
        const DetailLivraisonId=ReservationId
        if (!reservation) {
            return res.status(400).json({ message: "Réservation non trouvée." });
        }

        // Créer la nouvelle livraison
        const nouvelleLivraison = await Livraison.create({ 
            dateLivraison, 
            adresseLivraison, 
            heureLivraison, 
            DetailLivraisonId, // Associer l'ID de la réservation
            VoitureId, 
            EmployeId,
            ClientId,
            detailLivraison:reservation
        });

        // Récupérer les détails de la livraison, y compris la réservation associée
        const detailLivraison = await Livraison.findByPk(nouvelleLivraison.id, {
            include: [{
                model: Reservation,
                as: 'DetailLivraison' // Utiliser l'alias pour la relation
            }]
        });

        res.status(201).json(detailLivraison);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Modifier une Livraison
export const modifier_livraison = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const errors=validerLivraison(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
    try {
        
        const livraison = await Livraison.findByPk(id);
        if (!livraison) {
            return res.status(404).json({ message: "Livraison non trouvée" });
        }
        await livraison.update(updates);
        res.status(200).json(livraison);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une Livraison par son ID
export const recuperer_livraison = async (req, res) => {
    try {
        const { id } = req.params;
    
        const livraison = await Livraison.findByPk(id, {
            include: [Client,Voiture, Employe]
        });

        
        if (!livraison) {
            return res.status(404).json({ message: "Livraison non trouvée" });
        }
        res.status(200).json(livraison);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une Livraison
export const supprimer_livraison = async (req, res) => {
    try {
        const { id } = req.params;
        const livraison = await Livraison.findByPk(id);
        if (!livraison) {
            return res.status(404).json({ message: "Livraison non trouvée" });
        }
        await livraison.destroy();
        res.status(200).json({ message: "Livraison supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
