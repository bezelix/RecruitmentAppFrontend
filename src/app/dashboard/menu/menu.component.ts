import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
