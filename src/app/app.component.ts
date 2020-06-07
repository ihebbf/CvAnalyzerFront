import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu:boolean = true;
  title = 'CvAnalyserFront1';

  constructor(public router: Router) {

  }
}
