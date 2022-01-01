import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoadingService} from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOnLoginPage = false;
  isOnSharePage = false;

  constructor(
    private router: Router,
    public loadingService: LoadingService,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isOnLoginPage = val.url === '/kirjaudu';
        this.isOnSharePage = val.url.startsWith('/jaa');
      }
    });
  }
}
