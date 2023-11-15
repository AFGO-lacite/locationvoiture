import { Router } from "express";
import {
    liste_reservations,
    ajout_reservation,
    modifier_reservation,
    reservationParId,
    supprimer_reservation
} from "../controllers/Reservation.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeReservations = Router();

routeReservations.get('/',verifierToken,isAdmin,  liste_reservations)
    .post('/',verifierToken, ajout_reservation)
    .get('/:id',verifierToken,isAdmin,  reservationParId)
    .put('/:id',verifierToken,isAdmin,  modifier_reservation)
    .delete('/:id',verifierToken,isAdmin,  supprimer_reservation);

export default routeReservations;
