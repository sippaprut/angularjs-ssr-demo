import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { MessageComponent } from './message/message.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroFormComponent } from './hero-form/hero-form.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { StateOptionsComponent } from './state-options/state-options.component';
import { HeaderComponent } from './header/header.component';
import { FilterDateComponent } from './filter-date/filter-date.component';
import { DateSelectComponent } from './filter-date/date-select/date-select.component';
import { Daterangepicker } from 'ng2-daterangepicker';



@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    NavComponent,
    DashboardComponent,
    HeroFormComponent,
    StateOptionsComponent,
    HeaderComponent,
    FilterDateComponent,
    DateSelectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }) ,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule ,
    HttpClientModule ,
    NgSelectModule,
    Daterangepicker
  ],
  providers: [
    HeroService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }

 }


