import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio: HTMLAudioElement;
  private audioIntro: HTMLAudioElement;
  private musiques: string[] = [
    'Dmitri-Shostakovich-WaltzNo.2-audio.mp3',
    'tam-tam-audio.mp3',
    'Chopin-Nocturne-op.9-No.2.mp3',
    'Fred-again-Marea-We-ve-Lost-Dancing.mp3',
  ];

  constructor() {
    this.audioIntro = new Audio('/assets/audio/Razmokets.mp3');
    this.audio = new Audio();
    this.setRandomMusic();
  }

  private setRandomMusic(): void {
    const randomIndex = Math.floor(Math.random() * this.musiques.length);
    this.audio.src = `/assets/audio/${this.musiques[randomIndex]}`;
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  play() {
    this.setRandomMusic(); // Changer de musique avant de jouer
    this.audio.play().catch((error) => {
      console.log('Erreur de lecture audio :', error);
    });
  }

  PlayIntro() {
    this.audioIntro.play().catch((error) => {
      console.log('Erreur de lecture audio :', error);
    });
  }
  StopIntro() {
    this.audioIntro.pause();
    this.audioIntro.currentTime = 0;
  }
}
