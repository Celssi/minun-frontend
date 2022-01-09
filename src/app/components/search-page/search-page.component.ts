import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {User} from '../../models/user';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {debounceTime, distinctUntilChanged, filter, fromEvent, Observable, tap} from 'rxjs';
import {faFacebook, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {LinkType, SocialMediaLink} from '../../models/socialMediaLink';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  faSearch = faSearch;
  users: User[] = [];
  searchPhrase: string;
  searchOffset = 0;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  @ViewChild('search') searchInput: ElementRef;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.scrollEmitter.subscribe(() => {
      this.searchOffset += 1;
      this.search(this.searchPhrase, this.searchOffset);
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((event: any) => {
          this.users = [];
          this.searchPhrase = event.target.value;
          this.search(this.searchPhrase, this.searchOffset);
        })
      )
      .subscribe();
  }

  search(searchPhrase: string, offset: number): void {
    if (!searchPhrase) {
      return;
    }

    this.dataService.search(searchPhrase, offset).subscribe({
      next: (users: User[]) => {
        this.users.push(...users);
      }
    });
  }

  splitToChipList(itemString: string): string[] {
    return itemString?.split(', ').filter(Boolean) ?? [];
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
}
