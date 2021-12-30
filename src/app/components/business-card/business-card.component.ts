import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {faFacebook, faGithub, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {LinkType, SocialMediaLink} from '../../models/socialMediaLink';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {
  public user: User;

  isShareMode = false;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  qrElementType = NgxQrcodeElementTypes.URL;
  qrCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrValue = document.location.href;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
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

  getFacebookLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find(socialMediaLink => socialMediaLink.type === LinkType.Facebook)?.link ?? undefined;
  }

  getTwitterLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find(socialMediaLink => socialMediaLink.type === LinkType.Twitter)?.link ?? undefined;
  }

  getLinkedinLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find(socialMediaLink => socialMediaLink.type === LinkType.Linkedin)?.link ?? undefined;
  }

  getGithubLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find(socialMediaLink => socialMediaLink.type === LinkType.Github)?.link ?? undefined;
  }

  getLanguages(languages: string): string[] {
    return languages?.split(', ') ?? [];
  }

  getSpecialSkills(specialSkills: string): string[] {
    return specialSkills?.split(', ') ?? [];
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
