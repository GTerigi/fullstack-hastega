import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  timeout: number = 5;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.timeout--;
    }, 1000);
    setTimeout(() => {
      this.router.navigate(["/"])
    }, 5000)
  }

}
