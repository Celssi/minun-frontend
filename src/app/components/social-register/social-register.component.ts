import {Component, OnInit} from '@angular/core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.scss']
})
export class SocialRegisterComponent implements OnInit {
  faFacebook = faFacebook;

  constructor() {
  }

  ngOnInit(): void {
  }

  registerWithFacebook(): void {
    window.location.href = environment.facebookLoginUrl;
  }

}
