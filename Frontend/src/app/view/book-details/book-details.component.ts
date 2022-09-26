import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../interface/Book";
import {BooksService} from "../../services/books/books.service";
import {faPlus, faHeartCrack, faHeart} from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookInfo!: Book
  faPlus = faPlus;
  faHeartCrack = faHeartCrack;
  faHeart = faHeart;
  private bookId!: number

  constructor(private currentRoute: ActivatedRoute, private bookService: BooksService) {
  }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(params => {
      this.bookId = Number(params['bookId']);
      this.bookService.getBookInfo(this.bookId).subscribe(info => this.bookInfo = info);
    })

  }

}
