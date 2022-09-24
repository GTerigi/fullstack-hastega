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


@NgModule({
  declarations: [
    AppComponent,
    TheHeaderComponent,
    IndexComponent,
    LoginComponent,
    ContainerCardComponent,
    UserLoginComponent,
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
      {path: 'library', component: IndexComponent},
    ]),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
