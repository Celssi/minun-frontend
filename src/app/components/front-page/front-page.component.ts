import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Banner} from '../../models/banner';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  public banner: Banner;

  constructor(public authService: AuthService) {
    this.banner = new Banner(
      environment.adsense.adClient,
      1465505237,
      'auto',
      true
    );
  }

  ngOnInit(): void {

  }
}
