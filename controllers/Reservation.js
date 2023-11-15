import {Reservation } from "../models/relation.js";
import {Voiture} from "../models/relation.js"
import{Client} from "../models/relation.js"


// Liste des Réservations avec Détails Client et Voiture
export const liste_reservations = async (req, res) => {
    try {
        const resultat = await Reservation.findAll({
            include: [Client, Voiture] // Inclut les détails du client et de la voiture
        });
        res.status(200).json({ data: resultat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajout d'une Réservation avec Vérification de la Disponibilité de la Voiture
export const ajout_reservation = async (req, res) => {
    const { ClientId, VoitureId, Date_de_debut_de_la_reservation, Date_de_fin_de_la_reservation, ...autresDetails } = req.body;
  
    try {
        // Récupérer les informations du client et de la voiture
        const client = await Client.findByPk(ClientId);
        const voiture = await Voiture.findByPk(VoitureId);
        console.log(voiture)

        if (!client) {
            return res.status(404).json({ message: "client non trouvé" });
        }

        if (!voiture) {
            return res.status(404).json({ message: "Voiture non trouvée" });
        }

        if (!voiture.Disponibilite) {
            return res.status(400).json({ message: "Voiture non disponible" });
        }

        // Calculer le coût de la réservation
        const duree = new Date(Date_de_fin_de_la_reservation) - new Date(Date_de_debut_de_la_reservation); // Différence en millisecondes
        const jours = duree / (1000 * 3600 * 24); // Convertir en jours
        const Cout = jours * voiture.Prix_par_jour; // Calculer le coût
        console.log(jours)
        console.log(voiture.Prix_par_jour)
        // Créer la réservation avec le coût calculé
        const nouvelleReservation = await Reservation.create({
            ClientId: ClientId,
            VoitureId: VoitureId,
            Cout,
            Date_de_debut_de_la_reservation,
            Date_de_fin_de_la_reservation,
            ...autresDetails
        });

        // Mettre à jour la disponibilité de la voiture
        await voiture.update({ Disponibilite: false });

        res.status(201).json({ message: "Réservation ajoutée", data: nouvelleReservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Modification d'une Réservation
export const modifier_reservation = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        await reservation.update(updates);
        res.status(200).json({ message: "Réservation mise à jour" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Réservation par ID avec Détails Client et Voiture
export const reservationParId = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findByPk(id, {
            include: [Client, Voiture]
        });
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        res.status(200).json({ data: reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'une Réservation
export const supprimer_reservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        await reservation.destroy();
        res.status(200).json({ message: "Réservation supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
