import {Component, OnInit} from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  faFacebook = faFacebook;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {

  }

  registerWithFacebook(): void {
    window.location.href = environment.facebookLoginUrl;
  }
}
