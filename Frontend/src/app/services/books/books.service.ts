import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../../interface/Book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = `${environment.baseUrl}/books`;

  constructor(private httpC: HttpClient) {
  }

  getBooks(userId: number): Observable<Book[]> {
    let headers: HttpHeaders = this.getHeader();
    return this.httpC.get<Book[]>(`${this.apiUrl}/users/${userId}`, {
      headers
    });
  }

  getBookInfo(bookId: number): Observable<Book> {
    let headers: HttpHeaders = this.getHeader();
    return this.httpC.get<Book>(`${this.apiUrl}/${bookId}`, {
      headers
    });
  }

  getIcon(bookId: number) {
    let headers: HttpHeaders = this.getHeader();
    return this.httpC.post<any>(`${this.apiUrl}/${bookId}/icon`, {}, {responseType: 'blob' as 'json', headers});
  }

  increaseCounter(bookId: number) {
    let headers = this.getHeader();
    return this.httpC.put<any>(`${this.apiUrl}/${bookId}/counter`, {}, {headers});
  }

  deleteBook(bookId: number) {
    let headers = this.getHeader();
    return this.httpC.put<any>(`${this.apiUrl}/${bookId}/delete`, {}, {headers});
  }

  insertBookAgain(bookId: number) {
    let headers = this.getHeader();
    return this.httpC.put<any>(`${this.apiUrl}/${bookId}/restore`, {}, {headers});
  }

  private getHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('token', localStorage.getItem("token") || "");
    headers = headers.append('userId', localStorage.getItem("userId") || "");
    return headers;
  }
}
