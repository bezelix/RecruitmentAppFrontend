import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../modals/login-popup/login-popup.component';

interface navLink {
  name: string,
  path: string,
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  navLinks = [
    {
      name: 'Kandydaci',
      path: 'resumes'
    },
    {
      name: 'Mój profil',
      path: 'profile'
    },
  ]
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.dialog.open(LoginPopupComponent).afterClosed().subscribe(res => console.log(res));

  }

  logout() {

  }
}
