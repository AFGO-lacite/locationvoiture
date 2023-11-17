//Importer jwt
import jwt from 'jsonwebtoken'
import {Employe} from '../models/relation.js'


export const verifierToken = (req, res, next) => {
    //Recuperation du token
    const bearerToken = req.headers.authorization

    //Verification de la presence du token
    if (!bearerToken) return res.status(401).json({ message: "Il faut d'abord se connecter" })

    //Recuperer le token sans la partie Bearer
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, process.env.CODE_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ message: err.message })

        req.userId = payload.id

        next()
    })

}


export const isAdmin=async(req, res, next) => {
    //Recuperer ID a partir de req
    const id=req.userId
    // chercher la personne dans la base de donner

    try{
        const user=await Employe.findByPk(id)
        if(!user)return res.status(404).json({message:"Utilisateur introuvable"})
        const role=await user.getRole()
        console.log(role)
        if(role.Nom_Du_Role.toLowerCase()=='directeur'){
            
            next()
        }else{
            return res.status(404).json({message:"Vous n'avez pas acces"})

        }
        
    }catch(error){
        return res.status(403).json({message:error.message})
}

}