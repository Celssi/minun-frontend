import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.dataService.loginWithFacebookToken(params.token).subscribe({
        next: (result) => {
          this.dataService.setToken(result.token);
          this.dataService.setRefreshToken(result.refreshToken);
          this.authService.setUser(result.user);
          this.router.navigate(['etusivu']);
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(this.translate.instant('login.checkUsernameAndEmail'), this.translate.instant('miscellaneous.close'));
        }
      });
    });
  }

}
