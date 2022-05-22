import { Personne } from "./personne";

export class Evenement{
     id : number;
     nom : string;
     description : string;
     cloture : boolean;
     createur : Personne;


    
    //constructor de la classe
    constructor(id : number, nom : string, description : string, cloture : boolean , createur : Personne) {
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
    setDescription(desc : string) { this.description = desc; }
    setCloture(cl : boolean) { this.cloture = cl;}
    setNom(nom : string) { this.nom = nom;}
    

}