module.exports = class Personne {


    //constructeur de la classe
    constructor(id, nomUser, nom, prenom, ) {
        this.id = id;
        this.nomUser = nomUser;
        this.nom = nom
        this.prenom = prenom;
    }

    //Fonctions de la classe Personne


    //Getter de la classe
    getNomUser() { return this.nomUser; }

    getNom() { return this.nom; }

    getPrenom() { return this.prenom; }

    getId() { return this.id; }

    //Setter de la classe
    setId(id) { this.id = id; }

    setPrenom(prenom) { this.prenom =prenom;}

    setNom(nom) { this.nom =nom;}
    



}