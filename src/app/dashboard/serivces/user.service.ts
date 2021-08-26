import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/models/profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  editProfile(name: string): Observable<UserModel> {
    return this.http
      .post<any>('test', {
        name,
      })
      .pipe(map((res) => res.data));
  }

  profile(): Observable<UserModel> {
    return of({
      id: 1,
      name: 'test'
    });
    return this.http.get<UserModel>('ApiUrls.profile').pipe(
      tap((res) => this.authService.authUser$.next(res)),
      catchError((error: HttpErrorResponse) => throwError(error.error)),
    );
  }
}
