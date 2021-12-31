import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontPageComponent} from './components/front-page/front-page.component';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {InfoPageComponent} from './components/info-page/info-page.component';
import {BusinessCardComponent} from './components/business-card/business-card.component';

const routes: Routes = [
  {path: '', redirectTo: '/etusivu', pathMatch: 'full'},
  {path: 'etusivu', component: FrontPageComponent},
  {path: 'etusivu/:id', component: BusinessCardComponent},
  {path: 'jaa/:handle', component: BusinessCardComponent},
  {path: 'etsi', component: SearchPageComponent},
  {path: 'kirjaudu', component: LoginComponent},
  {path: 'tutustu', component: InfoPageComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
