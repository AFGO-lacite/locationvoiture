import { Router } from "express";
import {
    loginCliente
} from "../authentification/loginClient.js"

import {
    loginEmploye
} from "../authentification/loginEmploye.js"
const routeLogin= Router();

routeLogin
    .post('/client/', loginCliente)
    .post('/employe/', loginEmploye)
    

export default routeLogin;
