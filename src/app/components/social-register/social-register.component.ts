import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.scss']
})
export class SocialRegisterComponent implements OnInit {
  faFacebook = faFacebook;
  faGoogle = faGoogle;

  constructor() {}

  ngOnInit(): void {}

  registerWithFacebook(): void {
    window.location.href = environment.facebookLoginUrl;
  }

  registerWithGoogle(): void {
    window.location.href = environment.googleLoginUrl;
  }
}
