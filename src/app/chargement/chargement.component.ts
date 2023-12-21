import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chargement',
  templateUrl: './chargement.component.html',
  styleUrls: ['./chargement.component.css'],
})
export class ChargementComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.chargement();
  }

  chargement() {
    let delaiEnMillisecondes: number = this.genererDureeAleatoire(3000, 6000);
    console.log(delaiEnMillisecondes);
    setTimeout(() => {
      this.router.navigate(['/jeu']);
    }, delaiEnMillisecondes);
  }

  private genererDureeAleatoire(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
