import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/models/profile.model';
import { RoleModel } from 'src/app/shared/models/Role.model';
import { environment } from 'src/environments/environment';

const LS_TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  roles: RoleModel[];
  authUser: UserModel;
  authUser$ = new Subject<UserModel>();
  private onDestroy$ = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {
    this.authUser$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((user) => (this.authUser = user)),
      )
      .subscribe();
  }

  register(
    email: string,
    password: string,
    accountType: number = 1,
  ): Observable<void> {
    return this.http
      .post<void>(`${environment.apiUrl}account/register`, {
        roleId: accountType,
        email,
        password,
        ConfirmPassword: password,
      })
      .pipe();
  }

  getRoles(): Observable<RoleModel[]> {
    return this.roles ? of(this.roles) : this.http
      .get<RoleModel[]>(`${environment.apiUrl}account/role`)
      .pipe(
        tap((response) => this.roles = response),
      );
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<string>(`${environment.apiUrl}account/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => localStorage.setItem(LS_TOKEN_KEY, response)),
      );
  }

  logout() {
    return of();
    // this.http
    //   .post(ApiUrls.logout, {})
    //   .pipe(tap(() => (clearAll ? localStorage.clear() : localStorage.removeItem(LS_TOKEN_KEY))))
    //   .subscribe(() => this.router.navigate(['']));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
