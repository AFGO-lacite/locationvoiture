import { Router } from "express";
import {
    lister_maintenances,
    ajouter_maintenance,
    modifier_maintenance,
    recuperer_maintenance,
    supprimer_maintenance
} from "../controllers/Maintenance.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeMaintenances = Router();

routeMaintenances.get('/',verifierToken,isAdmin, lister_maintenances)
    .post('/',verifierToken,isAdmin,  ajouter_maintenance)
    .get('/:id',verifierToken,isAdmin,  recuperer_maintenance)
    .put('/:id',verifierToken,isAdmin,  modifier_maintenance)
    .delete('/:id',verifierToken,isAdmin,  supprimer_maintenance);

export default routeMaintenances;
