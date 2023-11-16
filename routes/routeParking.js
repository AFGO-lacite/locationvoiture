import { Router } from "express";
import {
    lister_parkings,
    ajouter_parking,
    modifier_parking,
    recuperer_parking,
    supprimer_parking
} from "../controllers/Parking.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeParkings = Router();

routeParkings.get('/',verifierToken,isAdmin, lister_parkings)
    .post('/',verifierToken,isAdmin,  ajouter_parking)
    .get('/:couleurDuParking',verifierToken,isAdmin,  recuperer_parking)
    .put('/:couleurDuParking',verifierToken,isAdmin,  modifier_parking)
    .delete('/:couleurDuParking',verifierToken,isAdmin,  supprimer_parking);

export default routeParkings;
