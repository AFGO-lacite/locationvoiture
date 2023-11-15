import { Router } from "express";
import {
    lister_clients,
    ajouter_client,
    modifier_client,
    recuperer_client,
    supprimer_client
} from "../controllers/Client.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeClients = Router();

routeClients.get('/',verifierToken,isAdmin, lister_clients)
    .post('/', ajouter_client)
    .get('/:id',verifierToken,isAdmin,  recuperer_client)
    .put('/:id',verifierToken,isAdmin,  modifier_client)
    .delete('/:id',verifierToken,isAdmin,  supprimer_client);

export default routeClients;
