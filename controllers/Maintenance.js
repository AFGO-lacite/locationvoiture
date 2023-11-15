// Importation des modèles nécessaires
import {Maintenance} from "../models/relation.js"; 
import {Voiture} from "../models/relation.js"; 
import {GarageDeMaintenance} from "../models/relation.js"; 

// Lister toutes les Maintenances
export const lister_maintenances = async (req, res) => {
    try {
        const maintenances = await Maintenance.findAll({
            include: [Voiture, GarageDeMaintenance] // Inclut les détails relatifs si nécessaire
        });
        res.status(200).json(maintenances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter une Maintenance
export const ajouter_maintenance = async (req, res) => {
    try {
        const { TypeDeMaintenance, DateDeDebut, DateDeFin, VoitureId, GarageDeMaintenanceId } = req.body;
        const nouvelleMaintenance = await Maintenance.create({ 
            TypeDeMaintenance, 
            DateDeDebut, 
            DateDeFin, 
            VoitureId, 
            GarageDeMaintenanceId 
        });
        res.status(201).json(nouvelleMaintenance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier une Maintenance
export const modifier_maintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const maintenance = await Maintenance.findByPk(id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance non trouvée" });
        }
        await maintenance.update(updates);
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une Maintenance par son ID
export const recuperer_maintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenance = await Maintenance.findByPk(id, {
            include: [Voiture, GarageDeMaintenance] // Inclut les détails relatifs si nécessaire
        });
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance non trouvée" });
        }
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une Maintenance
export const supprimer_maintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenance = await Maintenance.findByPk(id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance non trouvée" });
        }
        await maintenance.destroy();
        res.status(200).json({ message: "Maintenance supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
