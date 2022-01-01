import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {FrontPageComponent} from './components/front-page/front-page.component';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {InfoPageComponent} from './components/info-page/info-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatDividerModule} from '@angular/material/divider';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthService} from './services/auth.service';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from '@angular/material/snack-bar';
import {PageBuilderComponent} from './components/page-builder/page-builder.component';
import {BusinessCardComponent} from './components/business-card/business-card.component';
import {NotLoggedInInterceptor} from './interceptors/not-logged-in.interceptor';
import {MatChipsModule} from '@angular/material/chips';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {ImageSelectorComponent} from './components/image-selector/image-selector.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LoadingInterceptor} from './interceptors/load.interceptor';
import {LoadingService} from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FrontPageComponent,
    SearchPageComponent,
    LoginComponent,
    LogoutComponent,
    InfoPageComponent,
    PageBuilderComponent,
    BusinessCardComponent,
    ImageSelectorComponent,
    ImageSelectorComponent,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    ImageCropperModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonToggleModule,
    NgxQRCodeModule,
    NgxMaterialTimepickerModule.setLocale('fi-FI'),
    MatToolbarModule
  ],
  providers: [
    AuthService,
    MatSnackBar,
    LoadingService,
    {provide: HTTP_INTERCEPTORS, useClass: NotLoggedInInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    }
  ],
  exports: [
    ImageSelectorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
