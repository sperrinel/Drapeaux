export class Joueur {
  id: number;
  nom: string;
  avatar: string;
  score: number;
  serie: number;

  constructor(
    id: number,
    nom: string,
    avatar: string,
    score: number,
    serie: number
  ) {
    this.id = id;
    this.nom = nom;
    this.avatar = avatar;
    this.score = score;
    this.serie = serie;
  }
}
