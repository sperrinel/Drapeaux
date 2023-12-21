import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Drapeaux';

  constructor() {}

  ngOnInit() {}
}
