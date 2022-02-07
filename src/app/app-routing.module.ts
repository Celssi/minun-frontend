import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { GoogleComponent } from './components/google/google.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/etusivu', pathMatch: 'full' },
  { path: 'etusivu', component: FrontPageComponent },
  { path: 'etsi', component: SearchPageComponent },
  { path: 'kirjaudu', component: LoginComponent },
  { path: 'kirjaudu/facebook/:token', component: FacebookComponent },
  { path: 'kirjaudu/google/:token', component: GoogleComponent },
  { path: 'kirjaudu/facebook', component: FacebookComponent },
  { path: 'kirjaudu/google', component: GoogleComponent },
  { path: 'tutustu', component: InfoPageComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'keksit', component: CookiesComponent },
  { path: 'vahvista/:code/:email', component: ConfirmEmailComponent },
  { path: 'unohdin-salasanani', component: ForgotPasswordComponent },
  { path: 'unohdin-salasanani/:code', component: ForgotPasswordComponent },
  { path: ':handle', component: BusinessCardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
