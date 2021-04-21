import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AdvancedSearchComponent} from './pages/advanced-search/advanced-search.component';
import {ListPropertiesComponent} from './pages/list-properties/list-properties.component';
import {HomeComponent} from './pages/home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ListPropertiesComponent, AdvancedSearchComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
