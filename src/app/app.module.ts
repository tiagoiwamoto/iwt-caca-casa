import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AdvancedSearchComponent} from './pages/advanced-search/advanced-search.component';
import {HomeComponent} from './pages/home/home.component';
import {SideMenuComponent} from './pages/core/side-menu/side-menu.component';
import {HttpClientModule} from '@angular/common/http';
import {UserSigninComponent} from './pages/user/user-signin/user-signin.component';
import {UserSignComponent} from './pages/user/user-sign/user-sign.component';
import {UserProductRegisterComponent} from './pages/user/user-products/user-product-register/user-product-register.component';
import {ProductListComponent} from './pages/product/product-list/product-list.component';
import {ProductDetailsComponent} from './pages/product/product-details/product-details.component';

const config = {
  apiKey: 'AIzaSyCKbKN9WRyyPprJczGcA4hfFUD22x-e9mw',
  authDomain: 'caca-casa.firebaseapp.com',
  databaseURL: 'https://caca-casa-default-rtdb.firebaseio.com',
  projectId: 'caca-casa',
  storageBucket: 'caca-casa.appspot.com',
  messagingSenderId: '5158821869'
};

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      AdvancedSearchComponent,
      SideMenuComponent,
      UserSigninComponent,
      UserSignComponent,
      UserProductRegisterComponent,
      ProductListComponent,
      ProductDetailsComponent
    ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
