export class Personne {
    id: number;
    nomUser : string;
    nom : string;
    prenom : string;


    //constructeur de la classe
    constructor(id : number, nomUser : string, prenom : string, nom : string ) {
        this.id = id;
        this.nomUser = nomUser;
        this.nom = nom;
        this.prenom = prenom;
    }

    //Fonctions de la classe Personne


    //Getter de la classe
    getNomUser() { return this.nomUser; }

    getNom() { return this.nom; }

    getPrenom() { return this.prenom; }

    getId() { return this.id; }

    //Setter de la classe
    setId(id : number) { this.id = id; }

    setPrenom(prenom : string) { this.prenom =prenom;}

    setNom(nom : string) { this.nom =nom;}
    



}