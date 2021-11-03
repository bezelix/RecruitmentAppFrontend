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
}
