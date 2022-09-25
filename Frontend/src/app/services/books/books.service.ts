import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../interface/User";
import {Book} from "../../interface/Book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = `${environment.baseUrl}`;

  constructor(private httpC: HttpClient) {
  }

  getBooks(userId: number): Observable<Book[]> {
    return this.httpC.get<Book[]>(`${this.apiUrl}/users/${userId}/books`);
  }

}
