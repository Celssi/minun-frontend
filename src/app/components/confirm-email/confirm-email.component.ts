import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  public status = '';

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.translate.get('login.confirmingEmail').subscribe((translated) => {
      this.status = translated;

      this.route.params.subscribe((params: Params) => {
        this.dataService.confirmCode(params.email, params.code).subscribe({
          next: () => {
            this.status = this.translate.instant('login.emailConfirmed');
          },
          error: () => {
            this.status = this.translate.instant('login.emailCouldNotBeConfirmed');
          }
        });
      });
    });
  }

}
