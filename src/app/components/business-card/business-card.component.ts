import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { LoadingService } from '../../services/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {
  public user: User;
  public WEEKDAYS = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];

  isShareMode = false;
  qrValue = document.location.href;

  constructor(private dataService: DataService, private route: ActivatedRoute, public loadingService: LoadingService, private translate: TranslateService) {
    this.WEEKDAYS = [
      this.translate.instant('miscellaneous.monday'),
      this.translate.instant('miscellaneous.tuesday'),
      this.translate.instant('miscellaneous.wednesday'),
      this.translate.instant('miscellaneous.thursday'),
      this.translate.instant('miscellaneous.friday'),
      this.translate.instant('miscellaneous.saturday'),
      this.translate.instant('miscellaneous.sunday')
    ];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.dataService.getUserWithHandle(params.handle).subscribe({
        next: (user: User) => {
          this.user = user;
        }
      });
    });
  }

  splitToChipList(itemString: string): string[] {
    return itemString?.split(', ').filter(Boolean) ?? [];
  }

  toggleShare(): void {
    this.isShareMode = !this.isShareMode;
  }

  getUserName(): string {
    return this.user.accountType === 'user' ? this.user.firstName + ' ' + this.user.lastName : this.user.companyName;
  }

  hasMainContent(): boolean {
    return (
      !!this.user.description ||
      this.user.specialSkills?.length > 0 ||
      this.user.workHistories?.length > 0 ||
      this.user.educations?.length > 0 ||
      this.user.languages?.length > 0 ||
      (this.user.accountType === 'company' && this.user.businessHours?.length > 0)
    );
  }

  getContainerClasses(): string {
    return this.user.theme + (!this.hasMainContent() ? ' max-width-400 transparent-background' : '');
  }
}
