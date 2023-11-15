// Importation des modèles nécessaires
import {Employe} from "../models/relation.js"; 
import {Role} from "../models/relation.js"; 
import {SecurSalle} from "../models/relation.js"; 
import bcrypt from 'bcryptjs'


// Lister tous les Employes avec leurs Rôles et SecurSalles
export const lister_employes = async (req, res) => {
    try {
        const employes = await Employe.findAll({
            include: [Role, SecurSalle]
        });
        res.status(200).json(employes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un Employe
export const ajouter_employe = async (req, res) => {
    try {
        const { Nom, Prenom, Naissance, Telephone, Email, Mot_De_Passe, Photo, RoleId, SecurSalleId } = req.body;
        
        const mdpCrypte=bcrypt.hashSync(Mot_De_Passe,10)
        const nouvelEmploye = await Employe.create({ 
            Nom, 
            Prenom, 
            Naissance, 
            Telephone, 
            Email, 
            Mot_De_Passe:mdpCrypte, 
            Photo, 
            RoleId, 
            SecurSalleId 
        });
        res.status(201).json(nouvelEmploye);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un Employe
export const modifier_employe = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Prenom, Naissance, Telephone, Email, Mot_De_Passe, Photo, RoleId, SecurSalleId } = req.body;
        const employe = await Employe.findByPk(id);
        if (!employe) {
            return res.status(404).json({ message: "Employe non trouvé" });
        }
        await employe.update({ 
            Nom, 
            Prenom, 
            Naissance, 
            Telephone, 
            Email, 
            Mot_De_Passe, 
            Photo, 
            RoleId, 
            SecurSalleId 
        });
        res.status(200).json(employe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un Employe par son ID avec son Rôle et SecurSalle
export const recuperer_employe = async (req, res) => {
    try {
        const { id } = req.params;
        const employe = await Employe.findByPk(id, {
            include: [Role, SecurSalle]
        });
        if (!employe) {
            return res.status(404).json({ message: "Employe non trouvé" });
        }
        res.status(200).json(employe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un Employe
export const supprimer_employe = async (req, res) => {
    try {
        const { id } = req.params;
        const employe = await Employe.findByPk(id);
        if (!employe) {
            return res.status(404).json({ message: "Employe non trouvé" });
        }
        await employe.destroy();
        res.status(200).json({ message: "Employe supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
