import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { ErrorModel } from 'src/app/shared/models/error.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  handleValidationError(error: ErrorModel, form: FormGroup): Observable<never> {
    Object.keys(error.errors).forEach(errorKey => {
      if(form.controls[errorKey]) {
        const control = form.controls[errorKey];
        const errorMessage = error.errors[errorKey];
        control.setErrors({apiError: errorMessage});
      } else {
        throwError(errorKey + 'not found in error Handler');
      }

    });


    return throwError(error);
  }
}
