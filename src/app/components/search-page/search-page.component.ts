import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {User} from '../../models/user';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  faSearch = faSearch;
  users: User[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
