import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../interface/User";
import {Book} from "../../interface/Book";
import {BooksService} from "../../services/books/books.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import {Router} from "@angular/router";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class libraryComponent implements OnInit {
  loggedUser!: User;
  userBooks!: MatTableDataSource<Book>;
  bookAttributeToDisplay: { objKey: string, header: string }[] = [
    {objKey: 'title', header: 'Titolo'},
    {objKey: 'author', header: 'Autore'},
    {objKey: 'isbn', header: 'ISBN'},
    {objKey: 'dataAggiunta', header: 'Data di Aggiunta'},
    {objKey: 'numeroLetture', header: 'Numero di Letture'}
  ];
  displayColumns: string[] = [...this.bookAttributeToDisplay.map(el => el.objKey), 'lensIcon']
  faMagnifyingGlass = faMagnifyingGlass;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private booksService: BooksService, private router: Router) {
  }

  viewDetail(tmp: Event, selectedBook: Book) {
    this.router.navigate(['/book', selectedBook.id]);
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem("userInfo") || "");
    this.booksService.getBooks(this.loggedUser.id).subscribe({
      next: (books) => {
        this.userBooks = new MatTableDataSource<Book>(books);
        this.userBooks.paginator = this.paginator;
        this.userBooks.sort = this.sort;
      },
      error: (err) => console.error(err)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userBooks.filter = filterValue.trim().toLowerCase();

    if (this.userBooks.paginator) {
      this.userBooks.paginator.firstPage();
    }
  }
}
