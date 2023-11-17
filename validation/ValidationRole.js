const validerRole = role=> {
    const {  Nom_Du_Role } = role
    const NotEmptyRegex = /^\s*\S.*$/

   
    
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!NotEmptyRegex.test( Nom_Du_Role)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }

    if (estValide) return estValide
    return erreurs
}

export default  validerRole