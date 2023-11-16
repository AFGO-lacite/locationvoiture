// Importation des modèles nécessaires
import {Parking} from "../models/relation.js"; 
import {SecurSalle} from "../models/relation.js";
import validerParking from "../validation/ValidationParking.js";

// Lister tous les Parkings
export const lister_parkings = async (req, res) => {
    try {
        const parkings = await Parking.findAll({
            include: [SecurSalle] // Inclut les détails de SecurSalle si nécessaire
        });
        res.status(200).json(parkings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un Parking
export const ajouter_parking = async (req, res) => {
    const { couleurDuParking, SecurSalleId } = req.body;
    const errors=validerParking(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }

    try {
        const parkingExistante = await Parking.findOne({ where: { couleurDuParking } });
        if (parkingExistante) {
            return res.status(400).json({ error: "Cette couleur de parking est déjà attribuée." });
        }
        const nouveauParking = await Parking.create({ couleurDuParking, SecurSalleId });
        res.status(201).json(nouveauParking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un Parking
export const modifier_parking = async (req, res) => {
    const { couleurDuParking } = req.params;
    const updates = req.body;
    const errors=validerParking(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
    try {
        
        const parking = await Parking.findByPk(couleurDuParking);
        if (!parking) {
            return res.status(404).json({ message: "Parking non trouvé" });
        }
        await parking.update(updates);
        res.status(200).json(parking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un Parking par sa couleur
export const recuperer_parking = async (req, res) => {
    try {
        const { couleurDuParking } = req.params;
        const parking = await Parking.findByPk(couleurDuParking, {
            include: [SecurSalle] // Inclut les détails de SecurSalle si nécessaire
        });
        if (!parking) {
            return res.status(404).json({ message: "Parking non trouvé" });
        }
        res.status(200).json(parking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un Parking
export const supprimer_parking = async (req, res) => {
    try {
        const { couleurDuParking } = req.params;
        const parking = await Parking.findByPk(couleurDuParking);
        if (!parking) {
            return res.status(404).json({ message: "Parking non trouvé" });
        }
        await parking.destroy();
        res.status(200).json({ message: "Parking supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
