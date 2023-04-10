import { Component, Input, OnInit } from '@angular/core';
import { LinkType, SocialMediaLink } from '../../models/socialMediaLink';
import { faFacebook, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { User } from '../../models/user';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss']
})
export class SocialButtonsComponent implements OnInit {
  @Input() user: User;
  @Input() colorClass = 'light';

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  constructor() {}

  ngOnInit(): void {}

  getFacebookLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find((socialMediaLink) => socialMediaLink.type === LinkType.Facebook)?.link ?? undefined;
  }

  getTwitterLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find((socialMediaLink) => socialMediaLink.type === LinkType.Twitter)?.link ?? undefined;
  }

  getLinkedinLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find((socialMediaLink) => socialMediaLink.type === LinkType.Linkedin)?.link ?? undefined;
  }

  getGithubLink(socialMediaLinks: SocialMediaLink[]): string {
    return socialMediaLinks.find((socialMediaLink) => socialMediaLink.type === LinkType.Github)?.link ?? undefined;
  }
}
