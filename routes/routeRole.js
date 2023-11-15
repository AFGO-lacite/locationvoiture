import { Router } from "express";
import {
    lister_roles,
    ajouter_role,
    modifier_role,
    recuperer_role,
    supprimer_role
} from "../controllers/Role.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeRoles = Router();

routeRoles.get('/',verifierToken,isAdmin, lister_roles)
    .post('/',/*verifierToken,isAdmin,*/  ajouter_role)
    .get('/:id',verifierToken,isAdmin,  recuperer_role)
    .put('/:id',verifierToken,isAdmin,  modifier_role)
    .delete('/:id',verifierToken,isAdmin,  supprimer_role);

export default routeRoles;
