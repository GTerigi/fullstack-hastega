import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-the-header',
  templateUrl: './the-header.component.html',
  styleUrls: ['./the-header.component.scss']
})
export class TheHeaderComponent implements OnInit {
  title: string = 'Prova Tecnica Hastega';

  //TODO far vedere la mia libreria solo quando sono loggato
  constructor() {
  }

  // lifecycle Method
  ngOnInit(): void {
  }

}
