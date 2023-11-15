const validerClient = client => {
    const { nom,prenom, dateDeNaissance,email, motDePasse,telephone,adressePostale,numeroDePermis } = client
    const nomRegex = /^[a-zA-Z]+$/
    const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/i
    const telephoneRegex=/^[0-9- ]+$/

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPermisOntario = /^[A-Z]\d{4}-\d{5}-\d{5}$/;
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    
    let estValide = true  //Resultat de la validation reussie
    let erreurs = {}      //Resultat de la validation echouee
    if (!nomRegex.test(nom)) {
        erreurs['nom'] = "Le nom doit contenir seulement des caracteres de l'alphabet"
        estValide = false
    }

    if (!nomRegex.test(prenom)) {
        erreurs['prenom'] = "Le nom doit contenir seulement des caracteres de l'alphabet"
        estValide = false
    }

    if (!mdpRegex.test(motDePasse)) {
        erreurs['mdp'] = "Le mot de passe doit contenir Une Majuscule, une minuscule, chifre, character special et au moins 8 caracter"
        estValide = false
    }

    if(!telephoneRegex.test(telephone)){
        erreurs['Telephone'] = "Le numero de telephone doit etre comme ex: 1-555-555-5555"
        estValide = false

    }

    if (!regexEmail.test(email)) {
        erreurs['email'] = "email doit etre comme ex: exemple@email.com"
        estValide = false
    }

    if (!regexDate.test(dateDeNaissance)) {
        erreurs['naissance'] = "La date doit suivre le format DD-MM-YYYY"
        estValide = false
    }

    if (!regexPermisOntario.test(numeroDePermis)) {
        erreurs['Nemero de permis'] = "le numero de permis doit etre comme ex: G1234-56789-01234"
        estValide = false
    }

    



    if (estValide) return estValide
    return erreurs
}

export default  validerClient