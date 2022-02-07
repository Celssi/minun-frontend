import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ResetRequest } from '../../models/resetRequest';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  code: string;
  codeWrong = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.paramMap.get('code');

    if (this.dataService.getToken()) {
      this.router.navigate(['/etusivu']).then();
    }

    if (this.code) {
      this.dataService.getResetPassword(this.code).subscribe({
        next: (resetRequest: ResetRequest) => {
          this.codeWrong = !!!resetRequest;
        },
        error: (error) => {}
      });

      this.form = this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
        passwordAgain: ['', Validators.required]
      });
    } else {
      this.form = this.formBuilder.group({
        email: ['', Validators.required]
      });
    }
  }

  resetPassword(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.form.value.password !== this.form.value.passwordAgain) {
      this.form.controls.passwordAgain.setErrors({ noMatch: true });
      return;
    }

    const values = this.code ? { password: this.f.password.value, code: this.code } : { email: this.f.email.value };

    this.dataService.resetPassword(values).subscribe({
      next: () => {
        this.snackBar.open(
          this.code ? this.translate.instant('forgot.passwordResetted') : this.translate.instant('forgot.emailSent'),
          this.translate.instant('miscellaneous.close')
        );
        this.router.navigate(['/kirjaudu']).then();
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(this.translate.instant('miscellaneous.errorHappened'), this.translate.instant('miscellaneous.close'));
      }
    });
  }
}
