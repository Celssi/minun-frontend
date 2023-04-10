import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.scss']
})
export class SocialRegisterComponent implements OnInit {
  faFacebook = faFacebook;
  faGoogle = faGoogle;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {}

  registerWithFacebook(): void {
    this.loadingService.setLoading(true);
    window.location.href = environment.facebookLoginUrl;
  }

  registerWithGoogle(): void {
    this.loadingService.setLoading(true);
    window.location.href = environment.googleLoginUrl;
  }
}
