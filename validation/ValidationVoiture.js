const validerVoiture = voiture=> {
    const {      id,Marque,Modele,Type_de_voiture,Annee_de_fabrication,Disponibilite,Prix_par_jour } = voiture
    const NotEmptyRegex = /^\s*\S.*$/
    const boolRegex = /^(true|false)$/
    const regexannee=/^\d{4}$/
    const regexPrix=/^\d+(\.\d{1,2})?$/


    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!NotEmptyRegex.test(id)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }
    if (!NotEmptyRegex.test(Marque)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }
    if (!NotEmptyRegex.test(Modele)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }
    if (!NotEmptyRegex.test(Type_de_voiture)) {
        erreurs['Champ'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }

    if (!boolRegex.test(Disponibilite)) {
        erreurs['Disponibilité'] = "doit etre un booleen de type: true ou false"
        estValide = false
    }

    if (!regexannee.test(Annee_de_fabrication)) {
        erreurs['Année de fabrication'] = "doit etre comme ex: 2008"
        estValide = false
    }

    if (!regexPrix.test(Prix_par_jour)) {
        erreurs['Prix'] = "doit etre comme ex: 199,99"
        estValide = false
    }

    if (estValide) return estValide
    return erreurs
}

export default  validerVoiture