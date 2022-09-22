import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TheHeaderComponent} from './view/the-header/the-header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";
import {IndexComponent} from './view/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    TheHeaderComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    // RouterModule.forRoot([
    //   {path: '', component: ProductListComponent},
    //   {path: 'products/:productId', component: ProductDetailsComponent},
    // ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
