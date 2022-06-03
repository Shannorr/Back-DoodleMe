import { IPersonne } from "./personne";

// Interface pour les évènements
export interface IEvenement {
  id: number;
  nom: string;
  description: string;
  cloture: boolean;
  createur: IPersonne; //copie de l'objet comme ça accès à toutes les données du créateur (pas juste l'id du créateur)
}

