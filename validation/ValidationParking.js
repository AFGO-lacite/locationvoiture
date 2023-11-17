const validerParking = parking=> {
    const { couleurDuParking } = parking
    const NotEmptyRegex = /^\s*\S.*$/

   
    
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!NotEmptyRegex.test(couleurDuParking)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }

    if (estValide) return estValide
    return erreurs
}

export default  validerParking