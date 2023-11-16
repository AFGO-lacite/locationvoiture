const validerGarage = garage => {
    const { nomDuGarage,adresse } = garage
    const NotEmptyRegex = /^\s*\S.*$/

   
    
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!NotEmptyRegex.test(nomDuGarage)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }
    if (!NotEmptyRegex.test(adresse)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }

    if (estValide) return estValide
    return erreurs
}

export default  validerGarage