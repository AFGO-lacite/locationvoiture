// Importation des modèles nécessaires
import {Role} from "../models/relation.js"; 
import {Employe} from "../models/relation.js"; 
import validerRole from "../validation/ValidationRole.js";

// Lister tous les Roles
export const lister_roles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un Role
export const ajouter_role = async (req, res) => {
    const { Nom_Du_Role } = req.body;
    const errors=validerRole(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
    try {
        const nouveauRole = await Role.create({ Nom_Du_Role });
        res.status(201).json(nouveauRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un Role et renvoyer la liste des Employes affectés
export const modifier_role = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const errors=validerRole(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
    try {
       
        const role = await Role.findByPk(id, {
            include: [Employe]
        });
        if (!role) {
            return res.status(404).json({ message: "Role non trouvé" });
        }
        await role.update(updates);
        res.status(200).json({ message: "Role modifié avec succès", employes: role.Employes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un Role par son ID avec la liste des Employes associés
export const recuperer_role = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id, {
            include: [Employe]
        });
        if (!role) {
            return res.status(404).json({ message: "Role non trouvé" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un Role seulement s'il n'est pas attribué à des Employes
export const supprimer_role = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id, {
            include: [Employe]
        });
        if (!role) {
            return res.status(404).json({ message: "Role non trouvé" });
        }
        if (role.Employes && role.Employes.length > 0) {
            return res.status(400).json({ message: "Impossible de supprimer le rôle car il est actuellement attribué à des employés" });
        }
        await role.destroy();
        res.status(200).json({ message: "Role supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
