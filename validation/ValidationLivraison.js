const validerLivraison = livraison => {
    const { dateLivraison,adresseLivraison,heureLivraison } = livraison
    const NotEmptyRegex = /^\s*\S.*$/
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    const regexHeure=/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/

   
    
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!NotEmptyRegex.test(adresseLivraison)) {
        erreurs['Adresse'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }

    if (!regexDate.test(dateLivraison)) {
        erreurs['Date'] = "La date doit suivre le format YYYY-MM-DD"
        estValide = false
    }

    if (!regexHeure.test(heureLivraison)) {
        erreurs['Heure'] = "L'heure doit suivre le format HH:MM ex:  23:59"
        estValide = false
    }

    if (estValide) return estValide
    return erreurs
}

export default  validerLivraison