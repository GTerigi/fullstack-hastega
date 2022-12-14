import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {User} from "../../interface/User";
import {TokenResponse} from "../../interface/TokenResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.baseUrl}/users`;

  constructor(private httpC: HttpClient, private router: Router) {
  }

  isLogged(redirect: boolean = false): Observable<boolean> {
    let currentTimestamp: number = Math.floor(Date.now() / 1000); // Formattato nello stesso formato del Php
    let toReturn = new Subject<boolean>();
    if (localStorage.getItem("userId") === null ||
      localStorage.getItem("token") === null ||
      localStorage.getItem("tokenExp") === null ||
      Number(localStorage.getItem("tokenExp")) <= currentTimestamp) {
      toReturn.next(false);
      if (redirect) this.router.navigateByUrl("/login");
      return toReturn.asObservable();
    }
    this.httpC.post<String>(`${this.apiUrl}/checkToken`, {
        userId: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
      }
    ).subscribe({
      next: (isTokenValid) => {
        if (redirect && !isTokenValid) this.router.navigateByUrl("/login");
        toReturn.next(Boolean(isTokenValid))
      },
      error: (err) => {
        console.error(err);
        toReturn.next(false);
      }
    });

    return toReturn.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.httpC.get<User[]>(this.apiUrl);
  }

  loginUser(user: User): Observable<TokenResponse> {
    return this.httpC.get<TokenResponse>(`${this.apiUrl}/${user.id}/login`);
  }

  logoutUser(): Observable<any> {
    let userId: Number = Number(localStorage.getItem("userId"));
    return this.httpC.delete(`${this.apiUrl}/${userId}/logout`)
  }

  getIcon(userId: number) {
    return this.httpC.post<any>(`${this.apiUrl}/${userId}/icon`, {}, {responseType: 'blob' as 'json'});
  }
}
