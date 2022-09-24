import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user-service/user.service";
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-the-header',
  templateUrl: './the-header.component.html',
  styleUrls: ['./the-header.component.scss']
})
export class TheHeaderComponent implements OnInit {
  title: string = 'Prova Tecnica Hastega';
  isLogged: boolean = false;
  isLoginRoute: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    // Sottoscrivo un handler per il cambio di rotta.
    // Non voglio vedere il bottone di Login in alto a destra che è virtualmente inutile se sono sulla route /login
    router.events.subscribe((event) => (event instanceof NavigationEnd) && this.newRouteHandler())
  }

  // lifecycle Method
  ngOnInit(): void {

  }

  newRouteHandler() {
    console.log("NewRouteHandler");
    this.toggleLoginRoute();
    this.checkLoggedStatus();
  }

  toggleLoginRoute = () => {
    this.isLoginRoute = this.router.url === "/login";
  };

  checkLoggedStatus() {
    this.userService.isLogged().subscribe({
      next: (isLogged) => this.isLogged = isLogged,
      error: (err) => {
        console.error(err);
        this.isLogged = false;
      }
    });
  }

  logoutUser() {
    // Todo Aggiungere un bel dialog per chiedere se si è sicuri di voler effettuare il logout
    // https://material.angular.io/components/dialog/overview
    this.userService.logoutUser().subscribe({
      next: () => {
        localStorage.clear();
        alert("Logout");
        this.router.navigate(["/"]);
        this.isLogged = false;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
