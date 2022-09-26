import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../../interface/Book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = `${environment.baseUrl}`;

  constructor(private httpC: HttpClient) {
  }

  getBooks(userId: number): Observable<Book[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', localStorage.getItem("token") || "");
    headers = headers.append('userId', String(userId));
    return this.httpC.get<Book[]>(`${this.apiUrl}/books/users/${userId}`, {
      headers
    });
  }

  getBookInfo(bookId: number): Observable<Book> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', localStorage.getItem("token") || "");
    headers = headers.append('userId', localStorage.getItem("userId") || "");
    return this.httpC.get<Book>(`${this.apiUrl}/books/${bookId}`, {
      headers
    });
  }

}
