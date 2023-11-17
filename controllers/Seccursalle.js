


// Importation du modèle SecurSalle
import {SecurSalle} from "../models/relation.js"; 
import validerSecursalle from "../validation/ValidationSeccursalle.js";

// Lister toutes les SecurSalles
export const lister_securSalles = async (req, res) => {
    try {
        const securSalles = await SecurSalle.findAll();
        res.status(200).json(securSalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter une SecurSalle
export const ajouter_securSalle = async (req, res) => {
    const { adresseDeLaSecurSalle } = req.body;
    const errors=validerSecursalle(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }

  
    try {
        const nouvelleSecurSalle = await SecurSalle.create({ adresseDeLaSecurSalle });
        res.status(201).json(nouvelleSecurSalle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier une SecurSalle
export const modifier_securSalle = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const errors=validerSecursalle(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
    try {
        
        const securSalle = await SecurSalle.findByPk(id);
        if (!securSalle) {
            return res.status(404).json({ message: "SecurSalle non trouvée" });
        }
        await securSalle.update(updates);
        res.status(200).json(securSalle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une SecurSalle par son ID
export const recuperer_securSalle = async (req, res) => {
    try {
        const { id } = req.params;
        const securSalle = await SecurSalle.findByPk(id);
        if (!securSalle) {
            return res.status(404).json({ message: "SecurSalle non trouvée" });
        }
        res.status(200).json(securSalle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une SecurSalle
export const supprimer_securSalle = async (req, res) => {
    try {
        const { id } = req.params;
        const securSalle = await SecurSalle.findByPk(id);
        if (!securSalle) {
            return res.status(404).json({ message: "SecurSalle non trouvée" });
        }
        await securSalle.destroy();
        res.status(200).json({ message: "SecurSalle supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
