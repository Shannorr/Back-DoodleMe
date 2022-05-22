import {Personne} from "./personne";
import {Evenement} from "./evenement";

export class Favoris {
    personne: Personne;
    event : Evenement;


    //constructor
    constructor(personne: Personne, event: Evenement){
        this.personne = personne;
        this.event = event;
    }
}