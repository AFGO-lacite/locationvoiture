import { Router } from "express";
import {
    lister_garages,
    ajouter_garage,
    modifier_garage,
    recuperer_garage,
    supprimer_garage
} from "../controllers/Garage.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeGarages = Router();

routeGarages.get('/',verifierToken,isAdmin,  lister_garages)
    .post('/',verifierToken,isAdmin,  ajouter_garage)
    .get('/:id',verifierToken,isAdmin, recuperer_garage)
    .put('/:id',verifierToken,isAdmin,  modifier_garage)
    .delete('/:id',verifierToken,isAdmin,  supprimer_garage);

export default routeGarages;
