import { Router } from "express";
import {
    lister_securSalles,
    ajouter_securSalle,
    modifier_securSalle,
    recuperer_securSalle,
    supprimer_securSalle
} from "../controllers/Seccursalle.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeSecurSalles = Router();

routeSecurSalles.get('/',verifierToken,isAdmin, lister_securSalles)             
    .post('/',/*verifierToken,isAdmin,*/ ajouter_securSalle)                        
    .get('/:id',verifierToken,isAdmin, recuperer_securSalle)                    
    .put('/:id',verifierToken,isAdmin, modifier_securSalle)                     
    .delete('/:id',verifierToken,isAdmin, supprimer_securSalle);                
export default routeSecurSalles;
