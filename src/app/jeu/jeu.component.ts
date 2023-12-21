import { Drapeau } from './../model/drapeau';
import { Subscription } from 'rxjs';
import { Joueur } from '../model/joueur';
import { DrapeauxService } from './../drapeaux.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AudioService } from '../audio.service';
import { Jeu } from '../model/jeu';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'],
})
export class JeuComponent implements OnInit, AfterViewInit {
  drapeaux: any;
  joueurSubscription!: Subscription;
  drapeau: any = new Drapeau(1, 'France', '/assets/images/Drapeaux/France.png');
  drapeauTirés: string[] = [];
  joueur!: Joueur;
  score: number = 0;
  nombreDeDrapeauxSurVingt: number = 1;
  reponseUtilisateur: string = '';
  nChar: number = 10;
  tempsRestant: number;
  private intervalId: NodeJS.Timeout | null = null;
  meilleurScore: any;
  InitialiseDrapeaux: Drapeau[] = [];
  reponseDrapeau: string = '';
  bonneReponse!: boolean;
  finDePartie: boolean = false;

  constructor(
    private drapeauxService: DrapeauxService,
    private audioService: AudioService
  ) {
    this.tempsRestant = 20;
  }

  ngAfterViewInit() {
    // Utilisez le sélecteur de votre modal (ici, je suppose que c'est "staticBackdrop")
    const modalElement = document.getElementById('staticBackdrop');

    // Vérifier si l'élément existe
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);

      // Ouvrir la modal
      modal.show();
    } else {
      console.error("L'élément avec l'ID 'staticBackdrop' n'a pas été trouvé.");
    }
  }

  ngOnInit(): void {
    //remettre quand les tests seront terminés
    this.joueurSubscription = this.drapeauxService.joueurSubject.subscribe(
      (data: Joueur) => {
        this.joueur = data;
      }
    );
    this.drapeauxService.emitJoueurSubject();

    if (this.joueur == undefined) {
      this.joueur = new Joueur(1, 'Toto', '/assets/images/Avatars/1.png', 0, 0);
    }

    console.log(this.joueur);
    this.drapeauxService.getMeilleurScore().subscribe((data) => {
      this.meilleurScore = data;
      this.meilleurScore = this.meilleurScore.best;
    });
    // this.drapeauxService.emitJoueurSubject();
    this.drapeauxService.getAllDrapeaux().subscribe((datas) => {
      this.drapeaux = datas;
      this.InitialiseDrapeaux = this.drapeaux;
    });
  }

  lancementDuJeu() {
    this.drapeaux = this.InitialiseDrapeaux;
    this.score = 0;
    this.nombreDeDrapeauxSurVingt = 1;
    this.audioService.StopIntro();
    this.audioService.stop();
    this.audioService.play();
    this.tirageDrapeauxAleatoire();
  }

  validerReponse() {
    if (
      this.drapeau.nom.toLowerCase() === this.reponseUtilisateur.toLowerCase()
    ) {
      this.score++;
      this.afficherReponseNomDrapeau(true);
    } else {
      console.log("Oops ce n'est pas la bonne réponse.");
      this.afficherReponseNomDrapeau(false);
    }
    if (this.nombreDeDrapeauxSurVingt <= 19) {
      this.nombreDeDrapeauxSurVingt++;
      this.tirageDrapeauxAleatoire();
    } else {
      if (this.score > this.meilleurScore) {
        this.meilleurScore = this.score;
        let jeu: Jeu = new Jeu(1, this.meilleurScore);
        this.drapeauxService.updateMeilleurScore(jeu).subscribe(
          (reponse) => {
            console.log('Réponse de la requête :', reponse);
            // Traitez la réponse ici
          },
          (erreur) => {
            console.error('Erreur de la requête :', erreur);
            // Traitez l'erreur ici
          }
        );
        console.log('Après la requête');
      }
      this.goToFinDePartie();
      console.log('Partie terminée');
    }
    this.reponseUtilisateur = '';
  }

  // }
  // si il reste des parties

  // on continue le tirage en vérifiant que le drapeau tiré n'est pas déjà sorti
  // let resultatRecherche: boolean = true;
  // tant qu'on trouve le même nom dans le tableau, on refait le tirage
  // while (resultatRecherche == true) {
  //   try {

  // contrôle du drapeau en cours + ceux déjà tirés.
  // console.log(this.drapeau.nom);
  // console.table(this.drapeauTirés);
  // resultatRecherche = this.rechercheNomDansTableau(
  //   this.drapeau.nom,
  //   this.drapeauTirés
  // );
  // enfin si le drapeau n'est pas déjà sorti il reste en jeu et l'utilisateur peut répondre.
  //   if (resultatRecherche == false) {

  //   }
  // } catch (error) {
  //   console.error('Erreur lors du tirage du drapeau aléatoire', error);
  // Gérer l'erreur, par exemple, en sortant de la boucle ou en affichant un message à l'utilisateur.
  //       resultatRecherche = false;
  //     }
  //   }
  // }

  tirageDrapeauxAleatoire() {
    this.finDePartie = false;
    const indexAleatoire = Math.floor(Math.random() * this.drapeaux.length);
    this.drapeau = this.drapeaux[indexAleatoire];
    this.drapeaux = this.drapeaux
      .slice(0, indexAleatoire)
      .concat(this.drapeaux.slice(indexAleatoire + 1));
    this.demarrerCompteARebours();
  }

  demarrerCompteARebours() {
    this.tempsRestant = 20; // Réinitialiser à 20

    // Vérifier s'il y a déjà un intervalle en cours et le nettoyer
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.tempsRestant--;

      if (this.tempsRestant === 0) {
        clearInterval(this.intervalId!);
        this.afficherFinCompteARebours();
      }
    }, 1000);
  }

  private afficherFinCompteARebours() {
    if (this.nombreDeDrapeauxSurVingt <= 19) {
      this.validerReponse();
    } else if (this.finDePartie == false) {
      this.goToFinDePartie();
    } else {
      return;
    }
  }

  goToFinDePartie() {
    this.finDePartie = true;
    const modalFinDePartie = document.getElementById('finDePartie');
    if (modalFinDePartie) {
      const modal = new bootstrap.Modal(modalFinDePartie);
      modal.show();
    }
  }

  afficherReponseNomDrapeau(toggle: boolean) {
    if (toggle == true) {
      this.bonneReponse = true;
    } else {
      this.bonneReponse = false;
    }
    this.reponseDrapeau = this.drapeau.nom;
    setTimeout(() => {
      this.reponseDrapeau = '';
    }, 1500);
  }
}
