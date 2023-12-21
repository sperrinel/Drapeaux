import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JeuComponent } from './jeu/jeu.component';
import { DrapeauxService } from './drapeaux.service';
import { RouterModule, Routes } from '@angular/router';
import { JoueurComponent } from './joueur/joueur.component';
import { ChargementComponent } from './chargement/chargement.component';
import { FormsModule } from '@angular/forms';
import { AudioService } from './audio.service';

const routes: Routes = [
  { path: '', component: JoueurComponent },
  { path: 'jeu', component: JeuComponent },
  { path: 'joueurs', component: JoueurComponent },
  { path: 'loading', component: ChargementComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    JeuComponent,
    JoueurComponent,
    ChargementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    RouterModule,
  ],
  providers: [DrapeauxService, AudioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
