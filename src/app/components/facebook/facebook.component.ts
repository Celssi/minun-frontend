import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dataService: DataService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.token) {
        this.dataService.loginWithFacebookToken(params.token).subscribe({
          next: (result) => {
            this.dataService.setToken(result.token);
            this.dataService.setRefreshToken(result.refreshToken);
            this.authService.setUser(result.user);
            this.router.navigate(['etusivu']);
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.router.navigate(['kirjaudu']);
          }
        });
      } else {
        this.router.navigate(['kirjaudu']);
      }
    });
  }
}
