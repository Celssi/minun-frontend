import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  faSearch = faSearch;
  users: User[] = [];
  previousSearchPhrase: string;
  searchPhrase: string;
  searchOffset = 0;

  @ViewChild('search') searchInput: ElementRef;

  constructor(private dataService: DataService) {}

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
        debounceTime(1000),
        distinctUntilChanged(),
        tap((event: any) => {
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

    if (searchPhrase !== this.previousSearchPhrase) {
      this.searchOffset = 0;
      this.users = [];
      this.previousSearchPhrase = searchPhrase;
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
}
