import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ListPropertiesComponent} from './pages/list-properties/list-properties.component';
import {HomeComponent} from './pages/home/home.component';
import {DetailPropertieComponent} from './pages/list-properties/detail-propertie/detail-propertie.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListPropertiesComponent},
  {path: 'detail', component: DetailPropertieComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
