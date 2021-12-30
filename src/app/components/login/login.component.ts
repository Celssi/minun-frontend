import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {
  }

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
      this.dataService.login({email: this.loginFormGroup.get('email').value, password: this.loginFormGroup.get('password').value}).subscribe({
        next: (result) => {
          this.dataService.setToken(result.token);
          this.authService.setUser(result.user);

          this.snackBar.open('Tervetuloa takaisin ' + (result.user.firstName ?? result.user.companyName) + '!', 'Sulje');
          this.router.navigate(['etusivu']);
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open('Tarkista käyttäjätunnus ja salasana!', 'Sulje');
        }
      });
    }
  }
}
