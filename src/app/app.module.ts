import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDividerModule } from '@angular/material/divider';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './services/auth.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar } from '@angular/material/snack-bar';
import { PageBuilderComponent } from './components/page-builder/page-builder.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { NotLoggedInInterceptor } from './interceptors/not-logged-in.interceptor';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingInterceptor } from './interceptors/load.interceptor';
import { LoadingService } from './services/loading.service';
import { NgBusinessHoursLmModule } from 'ng-business-hours-lm';
import localeFI from '@angular/common/locales/fi';
import { registerLocaleData } from '@angular/common';
import { LocaleService } from './services/locale.service';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { CookieModule } from 'ngx-cookie';
import { CookiesComponent } from './components/cookies/cookies.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialElevationDirective } from './helpers/material-elevation.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatExpansionModule } from '@angular/material/expansion';
import { SocialButtonsComponent } from './components/social-buttons/social-buttons.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader.service';
import { FacebookComponent } from './components/facebook/facebook.component';
import { SocialRegisterComponent } from './components/social-register/social-register.component';
import { GoogleComponent } from './components/google/google.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { Observable } from 'rxjs';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

registerLocaleData(localeFI);

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domain
  },
  position: 'bottom',
  theme: 'edgeless',
  palette: {
    popup: {
      background: '#025174',
      text: '#FAF8F6'
    },
    button: {
      background: '#607D8B',
      text: '#FAF8F6'
    }
  },
  type: 'info',
  content: {
    message: 'Sivusto käyttää evästeitä parhaan käyttökokemuksen saavuttamiseksi.',
    dismiss: 'Hyväksyn!',
    deny: 'Refuse cookies',
    link: 'Lue lisää',
    href: '/keksit',
    policy: 'Cookie Policy'
  }
};

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService): () => Observable<any> {
  return () => {
    translate.setDefaultLang('fi');
    return translate.use('fi');
  };
}

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
    ForgotPasswordComponent,
    CookiesComponent,
    ConfirmModalComponent,
    MaterialElevationDirective,
    MaterialElevationDirective,
    SocialButtonsComponent,
    FacebookComponent,
    SocialRegisterComponent,
    GoogleComponent,
    ConfirmEmailComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonToggleModule,
    NgxQRCodeModule,
    NgxMaterialTimepickerModule.setLocale('fi-FI'),
    MatToolbarModule,
    NgBusinessHoursLmModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    CookieModule.withOptions(),
    MatDialogModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    MatExpansionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'fi'
    })
  ],
  providers: [
    AuthService,
    MatSnackBar,
    LoadingService,
    DynamicScriptLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: NotLoggedInInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 50000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    },
    LocaleService,
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.locale
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  exports: [ImageSelectorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
