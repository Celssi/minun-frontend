import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {
  public user: User;
  public WEEKDAYS = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];

  isShareMode = false;
  qrElementType = NgxQrcodeElementTypes.URL;
  qrCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrValue = document.location.href;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {
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
    return this.user.accountType === 'user' ? (this.user.firstName + ' ' + this.user.lastName) : this.user.companyName;
  }

  hasMainContent(): boolean {
    return !!this.user.description ||
      this.user.specialSkills?.length > 0 ||
      this.user.workHistories?.length > 0 ||
      this.user.educations?.length > 0 ||
      this.user.languages?.length > 0;
  }

  getContainerClasses(): string {
    return this.user.theme + (!this.hasMainContent() ? ' max-width-400 transparent-background' : '');
  }
}
