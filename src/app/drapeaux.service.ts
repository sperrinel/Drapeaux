import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joueur } from './model/joueur';
import { Subject, catchError, throwError } from 'rxjs';
import { Jeu } from './model/jeu';

@Injectable({
  providedIn: 'root',
})
export class DrapeauxService {
  joueur!: Joueur;
  joueurSubject = new Subject<Joueur>();
  readonly API_URL = 'http://localhost:8080';

  readonly ENDPOINT_DRAPEAUX = '/drapeaux'; //récupère tous les drapeaux.
  readonly ENDPOINT_JOUEURS = '/joueurs'; //récupère les deux joueurs
  readonly ENDPOINT_BESTSCORE = '/jeu/1'; //récupère une partie / modifie une partie en bdd

  constructor(private httpClient: HttpClient) {}

  getAllDrapeaux() {
    return this.httpClient.get(this.API_URL + this.ENDPOINT_DRAPEAUX); //tu me fais une requête qui va pointer vers l'url juste au dessus + le endpoint (concaténation)
  }

  getJoueurs() {
    return this.httpClient.get(this.API_URL + this.ENDPOINT_JOUEURS);
  }

  getJoueur(joueur: Joueur) {
    this.joueur = joueur;
    this.emitJoueurSubject();
    console.log('get joueur: ' + this.joueur);
  }

  emitJoueurSubject() {
    this.joueurSubject.next(this.joueur);
    console.table('je suis emitSubject ' + this.joueur + this.joueurSubject);
  }

  getMeilleurScore() {
    return this.httpClient.get(this.API_URL + this.ENDPOINT_BESTSCORE);
  }
  updateMeilleurScore(jeu: Jeu) {
    const corpsDeRequete = JSON.stringify(jeu);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log('hello from service angular');
    return this.httpClient.put(this.API_URL + this.ENDPOINT_BESTSCORE, jeu);
  }
}
