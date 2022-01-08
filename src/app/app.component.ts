import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoadingService} from './services/loading.service';

import WebFont from 'webfontloader';
import {filter, Subscription} from 'rxjs';
import {NgcCookieConsentService, NgcStatusChangeEvent} from 'ngx-cookieconsent';
import {CookieService} from 'ngx-cookie';
import {environment} from '../environments/environment';
import {SwUpdate} from '@angular/service-worker';

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
    private ccService: NgcCookieConsentService,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private updates: SwUpdate
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isOnLoginPage = val.url === '/kirjaudu';
      }
    });

    updates.checkForUpdate().then(event => {
      if (event && prompt('Sovellukseen on päivitys. Haluatko päivittää?')) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }

  ngOnInit(): void {
    WebFont.load({
      google: {
        families: [
          'Material Icons',
        ],
      },
    });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        this.setUpAnalytics();
      }
    );

    const consent = this.cookieService.get('cookieconsent_status');
    if (consent) {
      this.setUpAnalytics();
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

  setUpAnalytics(): void {
    if (environment.useAnalytics) {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          gtag('config', 'G-GEPNC6YNVY', {
              page_path: event.urlAfterRedirects
            }
          );
        });
    }
  }
}
