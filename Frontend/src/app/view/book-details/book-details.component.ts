import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {Book} from "../../interface/Book";
import {BooksService} from "../../services/books/books.service";
import {faPlus, faHeartCrack, faHeart} from "@fortawesome/free-solid-svg-icons"
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('hide', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('hide => visible', animate('500ms ease-in')),
    ]),
  ]
})
export class BookDetailsComponent implements OnInit {
  bookInfo!: Book
  faPlus = faPlus;
  faHeartCrack = faHeartCrack;
  faHeart = faHeart;
  iconIsLoading: boolean = true;
  transitionState: string = 'hide'
  fallbackIcon: string = './../assets/missing-book-cover.png';
  iconSrc!: string | ArrayBuffer | null;

  private bookId!: number

  constructor(private currentRoute: ActivatedRoute, private bookService: BooksService, private location: Location) {
  }

  ngOnInit(): void {
    this.currentRoute.params.subscribe({
      next: (params) => {
        this.bookId = Number(params['bookId']);
        if (!this.bookId) this.pageError("bookId not found");
        this.bookService.getBookInfo(this.bookId).subscribe({next: info => this.bookInfo = info, error: this.pageError});
        this.bookService.getIcon(this.bookId).subscribe({
          next: (data) => {
            this.createImageFromBlob(data);
          }
        })
      },
      error: this.pageError
    })

  }

  increaseCounter() {
    this.bookService.increaseCounter(this.bookId).subscribe({
      next: () => {
        this.bookInfo.numeroLetture++;
        alert("Operazione conclusa correttamente.");
      },
      error: (err) => {
        console.warn(err);
        alert("Non è stato possibile incrementare il contatore del libro per un errore di sistema.");
      }
    })
  }

  deleteBook() {
    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.bookInfo.dataRimozione = (new Date()).toLocaleString("it-IT");
        alert("Operazione conclusa correttamente.");
      },
      error: (err) => {
        console.warn(err);
        alert("Non è stato possibile eliminare il libro per un errore di sistema.");
      }
    })
  }

  insertBookAgain() {
    this.bookService.insertBookAgain(this.bookId).subscribe({
      next: () => {
        this.bookInfo.dataRimozione = null;
        alert("Operazione conclusa correttamente.");
      },
      error: (err) => {
        console.warn(err);
        alert("Non è stato possibile ripristinare il libro per un errore di sistema.");
      }
    })
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    this.iconIsLoading = false;
    reader.addEventListener("load", () => {
      this.iconSrc = reader.result;
      this.transitionState = 'visible';
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  private pageError(err: string) {
    window.history.back()
  }
}
