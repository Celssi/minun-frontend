import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataService.logout().subscribe();
    }, 0);
  }

}
