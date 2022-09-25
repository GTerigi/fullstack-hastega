import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../interface/User";
import {Book} from "../../interface/Book";
import {BooksService} from "../../services/books/books.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-libray',
  templateUrl: './libray.component.html',
  styleUrls: ['./libray.component.scss'],
})
export class LibrayComponent implements OnInit {
  loggedUser!: User;
  userBooks!: MatTableDataSource<Book>;
  bookAttributeToDisplay: string[] = ['title', 'author', 'isbn', 'dataAggiunta', 'numeroLetture'];
  displayColumns: string[] = [...this.bookAttributeToDisplay, 'lensIcon']
  faMagnifyingGlass = faMagnifyingGlass;
  // userBooks: Book[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private booksService: BooksService, library: FaIconLibrary) {
  }

  alertAll(tmp: any) {
    alert("CIAO");
    console.log(tmp)
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
