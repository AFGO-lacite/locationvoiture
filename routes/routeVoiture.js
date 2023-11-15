import { Router } from "express";
import { ajout_voiture, liste_voiture,supprimer_voiture,voitureParId,modifier_voiture } from "../controllers/Voiture.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeVoitures=Router()

routeVoitures.get('/',verifierToken,isAdmin, liste_voiture)
.get('/:id',verifierToken,isAdmin,voitureParId)
.post('/',verifierToken,isAdmin,ajout_voiture)
.put('/:id',verifierToken,isAdmin,modifier_voiture)
.delete('/:id',verifierToken,isAdmin,supprimer_voiture)

export default routeVoitures