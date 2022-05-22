import {Creneau} from "./creneau";
import {Personne} from "./personne";

export class Reponse{
    personne:Personne;
    creneau : Creneau;
    reponse : boolean;

    //constructor
    constructor(personne:Personne,creneau : Creneau, reponse:boolean){
        this.personne = personne;
        this.creneau = creneau;
        this.reponse = reponse;
    }
}