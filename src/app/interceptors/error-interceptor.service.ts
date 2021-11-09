import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorModel } from '../shared/models/error.model';

@Injectable()
export class ErrorIntercecptorService implements HttpInterceptor {

  constructor(
    private notifierService: NotifierService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleHttpError(error.error)),
    );
  }

  private handleHttpError(error: ErrorModel) {
    this.changeCaseInErrorFields(error);
    console.log(error);
    switch (error.status) {
      case 401:
        return throwError(error);

      case 403:
      case 404:
        this.notifierService.notify('error', error.title);
        return throwError(error);

      default:
        this.notifierService.notify('error', 'Uknown error occured!');
        return throwError(error);
    }
  }

  private changeCaseInErrorFields(error: ErrorModel) {
    error.errors = Object.keys(error.errors).reduce((prev, current) => ({ ...prev, [current.toLowerCase()]: error.errors[current]}), {})
  }
}
