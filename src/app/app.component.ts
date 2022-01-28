import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

import WebFont from 'webfontloader';
import { filter, Subscription } from 'rxjs';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { CookieService } from 'ngx-cookie';
import { environment } from '../environments/environment';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader.service';

// tslint:disable-next-line:ban-types
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isOnLoginPage = false;
  isOnSharePage = false;
  private statusChangeSubscription: Subscription;
  @ViewChild('wrapper')
  private wrapperDiv!: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    public ccService: NgcCookieConsentService,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private updates: SwUpdate,
    private dataService: DataService,
    private translate: TranslateService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isOnLoginPage = val.url === '/kirjaudu';
      }
    });

    if (updates.isEnabled) {
      updates.checkForUpdate().then((event) => {
        if (event && confirm(this.translate.instant('miscellaneous.updateAvailable'))) {
          updates.activateUpdate().then(() => document.location.reload());
        }
      });
    }

    this.translate.use('fi').subscribe(() => {
      this.loadingService.setLoading(true);
    });
  }

  private static loadFonts(): void {
    WebFont.load({
      google: {
        families: ['Material Icons']
      }
    });
  }

  ngOnInit(): void {
    AppComponent.loadFonts();

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
      this.setUpAnalytics(window.location.pathname);
    });

    const consent = this.cookieService.get('cookieconsent_status');
    if (consent) {
      this.setUpAnalytics(window.location.pathname);
    }
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  onActivate($event: any): void {
    if (this.wrapperDiv) {
      (this.wrapperDiv.nativeElement as HTMLElement).scrollTop = 0;
    }
  }

  setUpAnalytics(initialUrl?: string): void {
    if (environment.useAnalytics) {
      this.loadGoogleAnalytics().then(() => {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
          this.sendUrlToGoogleAnalytics(event.urlAfterRedirects);
        });

        if (initialUrl) {
          this.sendUrlToGoogleAnalytics(initialUrl);
        }
      });
    }
  }

  onScroll(): void {
    this.dataService.scrollEmitter.emit();
  }

  async loadGoogleAnalytics(): Promise<any> {
    const data = await this.dynamicScriptLoader.load('gtag', 'datalayer');
  }

  sendUrlToGoogleAnalytics(url: string): void {
    gtag('config', 'G-GEPNC6YNVY', {
      page_path: url
    });
  }
}
