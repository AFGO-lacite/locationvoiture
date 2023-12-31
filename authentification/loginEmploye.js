import {Employe}from'../models/relation.js'

//Importer le module qui cree le jeton d'authentification (token)
import jwt from 'jsonwebtoken'

//Importer le module de hachage
import bcrypt from 'bcryptjs'

export const loginEmploye = async (req, res) => {
    //Recuperation du login et mot de passe de l'utilisateur

    const { Email, Mot_De_Passe } = req.body

    
    if (!Email) return res.status(404).json({ message: "L'email est obligatoire!" })

    try {
        //Allons-y chercher l'utilisateur dans la base de donnee
        const user = await Employe.findOne({ where: { Email } })

        if (!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas" })

        //Verification du mot de passe

        const mdpVerifie = bcrypt.compareSync(Mot_De_Passe, user.Mot_De_Passe)

        if (!mdpVerifie) return res.status(400).json({ message: "Mot de passe incorrect" })

        //Tout est correct, nous allons donner une clef (token) a l'utilisateur

        const payload = { id: user.id }

        const token = jwt.sign(payload, process.env.CODE_SECRET)

        res.status(200).json({ data: user, token })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}