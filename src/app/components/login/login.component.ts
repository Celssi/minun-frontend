import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: UntypedFormGroup;
  faFacebook = faFacebook;
  faGoogle = faGoogle;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['etusivu']);
    }

    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginFormGroup.valid) {
      this.dataService.login({ email: this.loginFormGroup.get('email').value, password: this.loginFormGroup.get('password').value }).subscribe({
        next: (result) => {
          this.dataService.setToken(result.token);
          this.dataService.setRefreshToken(result.refreshToken);
          this.authService.setUser(result.user);
          this.router.navigate(['etusivu']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.snackBar.open(this.translate.instant('login.checkUsernameAndEmail'), this.translate.instant('miscellaneous.close'));
          } else if (error.status === 412) {
            this.snackBar.open(this.translate.instant('login.confirmEmail'), this.translate.instant('miscellaneous.close'));
          }
        }
      });
    }
  }

  forgotPassword(): void {
    this.router.navigate(['unohdin-salasanani']);
  }

  loginWithFacebook(): void {
    this.loadingService.setLoading(true);
    window.location.href = environment.facebookLoginUrl;
  }

  loginWithGoogle(): void {
    this.loadingService.setLoading(true);
    window.location.href = environment.googleLoginUrl;
  }
}
