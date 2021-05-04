import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ListPropertiesComponent} from './pages/list-properties/list-properties.component';
import {HomeComponent} from './pages/home/home.component';
import {DetailPropertieComponent} from './pages/list-properties/detail-propertie/detail-propertie.component';
import {UserSigninComponent} from './pages/user/user-signin/user-signin.component';
import {UserSignComponent} from './pages/user/user-sign/user-sign.component';
import {UserProductRegisterComponent} from './pages/user/user-products/user-product-register/user-product-register.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: UserSigninComponent},
  {path: 'cadastrar', component: UserSignComponent},
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListPropertiesComponent},
  {path: 'detail', component: DetailPropertieComponent},
  {path: 'product/register', component: UserProductRegisterComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
