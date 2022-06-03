import { IPersonne } from "./personne";

// Interface Evenement Favori
export interface IEvenementFavori {
    iduser: number;
    idevent: number;
    nom: string;
    description: string;
    cloture: boolean;
    idcreator: any; //copie de l'objet comme ça accès à toutes les données du créateur (pas juste l'id du créateur)
}