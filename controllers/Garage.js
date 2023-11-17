// Importation du modèle GarageDeMaintenance
import { GarageDeMaintenance } from "../models/relation.js";
import { ExpressValidator } from "express-validator";
import validerGarage from "../validation/ValidationGarage.js";

// Lister tous les Garages de Maintenance
export const lister_garages = async (req, res) => {
    try {
        const garages = await GarageDeMaintenance.findAll();
        res.status(200).json(garages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un Garage de Maintenance
export const ajouter_garage = async (req, res) => {
    const { nomDuGarage, adresse } = req.body;
    const errors=validerGarage(req.body)
    if(errors!==true){
        return res.status(400).json({ errors });  
    }
    
    try {
        
        const nouveauGarage = await GarageDeMaintenance.create({ nomDuGarage, adresse });
        res.status(201).json(nouveauGarage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un Garage de Maintenance
export const modifier_garage = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const errors=validerGarage(req.body)
    if(errors!==true){
        return res.status(400).json({ errors });  
    }
    try {
        
        const garage = await GarageDeMaintenance.findByPk(id);
        if (!garage) {
            return res.status(404).json({ message: "Garage de Maintenance non trouvé" });
        }
        await garage.update(updates);
        res.status(200).json(garage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un Garage de Maintenance par son ID
export const recuperer_garage = async (req, res) => {
    try {
        const { id } = req.params;
        const garage = await GarageDeMaintenance.findByPk(id);
        if (!garage) {
            return res.status(404).json({ message: "Garage de Maintenance non trouvé" });
        }
        res.status(200).json(garage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un Garage de Maintenance
export const supprimer_garage = async (req, res) => {
    try {
        const { id } = req.params;
        const garage = await GarageDeMaintenance.findByPk(id);
        if (!garage) {
            return res.status(404).json({ message: "Garage de Maintenance non trouvé" });
        }
        await garage.destroy();
        res.status(200).json({ message: "Garage de Maintenance supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
