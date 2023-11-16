const validerMaintenance = maintenance => {
    const { TypeDeMaintenance,DateDeDebut,DateDeFin } = maintenance
    const NotEmptyRegex = /^\s*\S.*$/
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    

   
    
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!NotEmptyRegex.test(TypeDeMaintenance)) {
        erreurs['Type de maintenance'] = "Il ne faut pas laisser de champ vide"
        estValide = false
    }

    if (!regexDate.test(DateDeDebut)) {
        erreurs['Date'] = "La date doit suivre le format YYYY-MM-DD"
        estValide = false
    }
    if (!regexDate.test( DateDeFin)) {
        erreurs['Date'] = "La date doit suivre le format YYYY-MM-DD"
        estValide = false
    }

    if (estValide) return estValide
    return erreurs
}

export default  validerMaintenance