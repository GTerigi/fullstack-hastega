import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from "../services/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserIsLoggedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("canActivate");

    return this.userService.isLogged();
    // .pipe(map(isLoggedIn => {
    //     console.log("isLoggedIn", isLoggedIn)
    //     if (!isLoggedIn) this.router.navigate(['/login']);
    //
    //     return isLoggedIn;
    //   }));
  }

}
