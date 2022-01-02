import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoadingService} from './services/loading.service';

import WebFont from 'webfontloader';
import {Subscription} from 'rxjs';
import {NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent} from 'ngx-cookieconsent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isOnLoginPage = false;
  isOnSharePage = false;

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  @ViewChild('wrapper')
  private wrapperDiv!: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    private ccService: NgcCookieConsentService,
    public loadingService: LoadingService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isOnLoginPage = val.url === '/kirjaudu';
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

    console.log(this.ccService)
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );
  }

  ngOnDestroy(): void {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  onActivate($event: any): void {
    if (this.wrapperDiv) {
      (this.wrapperDiv.nativeElement as HTMLElement).scrollTop = 0;
    }
  }
}
