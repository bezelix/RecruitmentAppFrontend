import { Component, OnInit } from '@angular/core';
import { AuthService } from '../serivces/auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authService.getUser().subscribe();
    }
  }

}
