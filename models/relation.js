// Importer tous les models
import Voiture from "./Voiture.js";
import Reservation from "./Reservation.js";
import Role from "./Role.js";
import Client from "./Client.js";
import Employe from "./Employé.js";
import GarageDeMaintenance from "./Garage.js";
import Livraison from "./Livraison.js";
import Parking from "./Parking.js";
import SecurSalle from "./Seccursalle.js";
import Maintenance from "./Maintenance.js";



// Définir la relation plusieurs-à-plusieurs entre Voiture et GarageDeMaintenance
Voiture.belongsToMany(GarageDeMaintenance, { through: Maintenance });
GarageDeMaintenance.belongsToMany(Voiture, { through: Maintenance });




// Appliquer les relations (associations)
Voiture.hasOne(Reservation)
Reservation.belongsTo(Voiture)
Employe.belongsTo(Role)
Role.hasMany(Employe)
Employe.belongsTo(SecurSalle)
SecurSalle.hasMany(Employe)
SecurSalle.hasMany(Parking)
Parking.belongsTo(SecurSalle)
Parking.hasMany(Voiture)
Voiture.belongsTo(Parking)
Client.hasMany(Reservation)
Reservation.belongsTo(Client)
Livraison.belongsTo(Reservation, { as: 'DetailLivraison' });

Livraison.belongsTo(Employe)
Livraison.belongsTo(Client)
Livraison.belongsTo(Voiture)
Voiture.hasMany(Maintenance)
Maintenance.belongsTo(Voiture)
GarageDeMaintenance.hasMany(Maintenance)
Maintenance.belongsTo(GarageDeMaintenance)



export  { Voiture, Reservation, Role,Client,Employe,GarageDeMaintenance,Livraison,SecurSalle,Parking,Maintenance }