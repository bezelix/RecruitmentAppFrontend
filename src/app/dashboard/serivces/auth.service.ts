import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/models/profile.model';

const LS_TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
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
    accountType: number,
  ): Observable<void> {
    return of();
    // return this.http
    //   .post<void>(ApiUrls.register, {
    //     account_type: accountType,
    //     email,
    //     name,
    //     password,
    //     password_confirmation: passwordConfirmation,
    //     regs,
    //   })
    //   .pipe();
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<string>('login', {
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
