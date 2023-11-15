import {Parking, Voiture, SecurSalle } from "../models/relation.js";


export const liste_voiture = async (req, res) => {
    try {
        //retourner la liste complete des etudiants
        const resultat = await Voiture.findAll({
            include: [{
                model: Parking,
                include: [SecurSalle] 
            }]})
        res.status(200).json({ data: resultat })

    } catch (error) {

        res.json({ error: error.message })
    }
}

export const ajout_voiture = async(req,res)=>{
    const {id,Marque,Modele,Type_de_voiture,Annee_de_fabrication,Disponibilite,Prix_par_jour,ParkingCouleurDuParking}=req.body
    const voiture={id,Marque,Modele,Type_de_voiture,Annee_de_fabrication,Disponibilite,Prix_par_jour,ParkingCouleurDuParking}
    try{
        const resultat = await Voiture.create(voiture)
        res.status(200).json({ message:"Voiture ajoutée" })
    }
    catch{res.status(404).json({ error: error.message })}

}


export const modifier_voiture=async(req,res)=>{

    const {id}=req.params
    const voiture=req.body
    try{

        await Voiture.update(voiture, {where:{id}})
        res.status(200).json({ message:"etuiant mis a jour" })
    }
    catch (error) {

        res.status(404).json({ error: error.message })
    }

}

export const voitureParId = async (req, res) => {
    const id = req.params.id;
    try {
        const resultat = await Voiture.findByPk(id, {
            include: [{
                model: Parking,
                include: [SecurSalle] 
            }]
        });
        res.status(200).json({ data: resultat });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


export function voitureParId2(ID){
    const id=ID
    
        const resultat = Voiture.findByPk(id)
        return resultat

    

}

export const supprimer_voiture = async (req, res) => {
    const { id } = req.params;
    try {
        const voiture = await Voiture.findByPk(id);
        if (!voiture) {
            return res.status(404).json({ message: "Voiture non trouvée" });
        }

        // Vérifier si la voiture est actuellement réservée
        const reservationActive = await Reservation.findOne({ where: { VoitureId: id } });
        if (reservationActive) {
            return res.status(400).json({ message: "La voiture est actuellement réservée et ne peut pas être supprimée" });
        }

        await voiture.destroy();
        res.status(200).json({ message: "Voiture supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};