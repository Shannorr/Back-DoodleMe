import { Evenement } from "./evenement";

export class Creneau {
    evenement : Event;
    id : number;
    date: string;
    heureDebut: string;
    nbRepPositive: number;

    
    //constructor

    constructor(evenement : Event, id : number, date : string, heureDebut : string, nbRepPositives : number) {
        this.evenement = evenement;
        this.id = id;
        this.date = date;
        this.heureDebut = heureDebut;
        this.nbRepPositive = nbRepPositives;
    }

    //getter de la classe 
    getDate() {return this.date;}
    getHeureDebut() {return this.heureDebut;}
    getNbRepPositives() {return this.nbRepPositive;}
    getId() {return this.id;}

    //Setter de la classe
    setDate(date : string) {this.date = date;}
    setHeureDebut(heureDebut : string) {this.heureDebut = heureDebut;}



}