import {Component, ElementRef, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoadingService} from './services/loading.service';
import * as FontFaceObserver from 'fontfaceobserver';

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
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isOnLoginPage = val.url === '/kirjaudu';
        this.isOnSharePage = val.url.startsWith('/jaa');
      }
    });

    const materialIcons = new FontFaceObserver('Material Icons');
    materialIcons.load(null, 10000)
      .then(() => this.renderer.addClass(this.elementRef.nativeElement, 'material-icons-loaded'));
  }
}
