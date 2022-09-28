import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TheHeaderComponent} from './component/the-header/the-header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";
import {IndexComponent} from './view/index/index.component';
import {LoginComponent} from './view/login/login.component';
import {ContainerCardComponent} from './component/container-card/container-card.component';
import {UserLoginComponent} from './component/user-login/user-login.component';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {libraryComponent} from './view/library/library.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UserIsLoggedGuard} from "./guard/user-is-logged.guard";
import {NotFoundComponent} from './view/not-found/not-found.component';
import {BookDetailsComponent} from './view/book-details/book-details.component';
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    TheHeaderComponent,
    IndexComponent,
    LoginComponent,
    ContainerCardComponent,
    UserLoginComponent,
    libraryComponent,
    NotFoundComponent,
    BookDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot([
      {path: '', component: IndexComponent},
      {path: 'login', component: LoginComponent},
      {path: 'library', component: libraryComponent, canActivate: [UserIsLoggedGuard]},
      {path: 'book/:bookId', component: BookDetailsComponent, canActivate: [UserIsLoggedGuard]},
      {path: '**', component: NotFoundComponent},
    ]),
    FontAwesomeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
