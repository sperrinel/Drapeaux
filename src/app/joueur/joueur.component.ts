import { Router } from '@angular/router';
import { Joueur } from '../model/joueur';
import { DrapeauxService } from './../drapeaux.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.scss'],
})
export class JoueurComponent implements OnInit, OnDestroy {
  joueurs: any[] = [];
  toggleJouer!: boolean;
  constructor(
    private drapeauxService: DrapeauxService,
    private route: Router,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.toggleJouer = false;
    this.drapeauxService.getJoueurs().subscribe((data) => {
      if (Array.isArray(data)) {
        this.joueurs = this.joueurs.concat(data);
      } else {
        this.joueurs.push(data);
      }
    });
  }

  selectJoueur(event: any, choix: number) {
    let joueur: Joueur = this.joueurs[choix];
    this.drapeauxService.getJoueur(joueur);
    this.navigateToLoading();
  }

  ngOnDestroy(): void {
    // Ne pas appeler ngOnDestroy directement, mais plutôt naviguer vers la route ici
    this.navigateToLoading();
  }

  private navigateToLoading() {
    this.route.navigate(['/loading']);
  }

  jouer() {
    this.audioService.PlayIntro();
    setTimeout(() => {
      this.toggleJouer = true;
    }, 3000);
  }
}
