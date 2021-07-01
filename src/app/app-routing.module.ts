import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UserSigninComponent} from './pages/user/user-signin/user-signin.component';
import {UserSignComponent} from './pages/user/user-sign/user-sign.component';
import {UserProductRegisterComponent} from './pages/user/user-products/user-product-register/user-product-register.component';
import {ProductListComponent} from './pages/product/product-list/product-list.component';
import {ProductNegociateComponent} from './pages/product/product-negociate/product-negociate.component';
import {NegociateListComponent} from './pages/negociate/negociate-list/negociate-list.component';
import {NegociateChatComponent} from './pages/negociate/negociate-chat/negociate-chat.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: UserSigninComponent},
  {path: 'cadastrar', component: UserSignComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'product/register', component: UserProductRegisterComponent},
  {path: 'product/negociate', component: ProductNegociateComponent},
  {path: 'negociate/list', component: NegociateListComponent},
  {path: 'negociate/chat', component: NegociateChatComponent},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
