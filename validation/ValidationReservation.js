const validerReservation = reservation => {
    const { Date_de_debut_de_la_reservation, Date_de_fin_de_la_reservation,Livraison  } = reservation
    const boolRegex = /^(true|false)$/
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;


   
    
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!boolRegex.test(Livraison)) {
        erreurs['Livraison'] = "doit etre un booleen de type: true ou false"
        estValide = false
    }

    if (!regexDate.test(Date_de_debut_de_la_reservation)) {
        erreurs['Date'] = "La date doit suivre le format YYYY-MM-DD"
        estValide = false
    }

    if (!regexDate.test(Date_de_fin_de_la_reservation)) {
        erreurs['Date'] = "La date doit suivre le format YYYY-MM-DD"
        estValide = false
    }



    if (estValide) return estValide
    return erreurs
}

export default  validerReservation