const  Personne = require('./personne');

module.exports = class Evenement{

    
    //constructor de la classe
    constructor(id, nom, description, cloture, createur) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.cloture = cloture;
        this.createur = createur;
    }
    

    //getter de la classe
    getDescription() { return this.description; }
    getCloture() { return this.cloture; }
    getNom() { return this.nom; }
    getId() { return this.id; }

    //setter de la classe
    setDescription(desc) { this.description = desc; }
    setCloture(cl) { this.cloture = cl;}
    setNom(nom) { this.nom = nom;}
    

}