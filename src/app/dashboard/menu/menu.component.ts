import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthPopupComponent } from '../modals/auth-popup/auth-popup.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();
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
    this.dialog.open(AuthPopupComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => console.log(res));
  }

  logout() {

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
