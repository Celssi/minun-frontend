import {AfterViewInit, Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Banner} from '../../models/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit {

  @Input() banner: Banner;
  showAd = environment.adsense.show;

  constructor() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
          overlays: {bottom: true}
        });
      } catch (e) {
        console.error(e);
      }
    }, 0);
  }
}
