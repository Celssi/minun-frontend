import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {VersionService} from '../../services/version.service';
import packageInfo from '../../../../package.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  backendVersion: string;
  appVersion: string;
  showArrowLeft = false;
  showArrowRight = false;
  @ViewChild('navcontainer') private navContainer: ElementRef<HTMLElement>;

  constructor(
    private versionService: VersionService,
    private router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.appVersion = packageInfo.version;

    this.versionService.get().subscribe((response: any) => {
      this.backendVersion = response.version;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showArrowRight = (this.navContainer.nativeElement.scrollWidth - window.innerWidth) > 30;

      const selectedLink = document.getElementsByClassName('active-link')[0] || undefined;
      if (selectedLink) {
        selectedLink.scrollIntoView({
          behavior: 'smooth',
          inline: 'center'
        });
      }
    }, 0);

    this.navContainer.nativeElement.addEventListener('scroll', (event) => {
      this.showArrowLeft = this.navContainer.nativeElement.scrollLeft > 30;
      this.showArrowRight = this.navContainer.nativeElement.scrollWidth > this.navContainer.nativeElement.scrollLeft + window.innerWidth + 30;
    });
  }

  logout(): void {
    this.router.navigate(['/logout']).then();
  }

  scrollLeft(): void {
    this.navContainer.nativeElement.scrollBy({
      left: -100,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.navContainer.nativeElement.scrollBy({
      left: 100,
      behavior: 'smooth'
    });
  }
}
