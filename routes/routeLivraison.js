import { Router } from "express";
import {
    lister_livraisons,
    ajouter_livraison,
    modifier_livraison,
    recuperer_livraison,
    supprimer_livraison
} from "../controllers/Livraison.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeLivraisons = Router();

routeLivraisons.get('/',verifierToken,isAdmin, lister_livraisons)
    .post('/',verifierToken,isAdmin,  ajouter_livraison)
    .get('/:id',verifierToken,isAdmin,  recuperer_livraison)
    .put('/:id',verifierToken,isAdmin,  modifier_livraison)
    .delete('/:id',verifierToken,isAdmin,  supprimer_livraison);

export default routeLivraisons;
