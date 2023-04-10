import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, filter, Observable, Subject, switchMap } from 'rxjs';

interface SearchRequest {
  searchPhrase: string;
  offset: number;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  @ViewChild('search') searchInput: ElementRef;

  searchTerm$ = new Subject<string>();
  faSearch = faSearch;
  users: User[] = [];
  searchPhrase: string;
  searchOffset = 0;

  constructor(private dataService: DataService) {
    this.search(this.searchTerm$).subscribe((results: User[]) => {
      this.users = results;
    });
  }

  ngOnInit(): void {
    this.dataService.scrollEmitter.subscribe(() => {
      this.searchOffset += 1;
      this.searchEntries(this.searchPhrase, this.searchOffset).subscribe((values: User[]) => {
        this.users.push(...values);
      });
    });
  }

  search(terms: Observable<string>): Observable<User[]> {
    return terms.pipe(
      filter(Boolean),
      debounceTime(500),
      switchMap((term: string) => {
        return this.searchEntries(term, 0);
      })
    );
  }

  searchEntries(searchPhrase: string, offset: number): Observable<User[]> {
    this.searchOffset = offset;
    this.users = offset !== 0 ? this.users : [];
    return this.dataService.search(searchPhrase, offset);
  }

  splitToChipList(itemString: string): string[] {
    return itemString?.split(', ').filter(Boolean) ?? [];
  }

  getSearchRequest(value: string): SearchRequest {
    return { searchPhrase: value, offset: this.searchOffset };
  }
}
