import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/dashboard/serivces/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  get emailCtrl() { return this.form.get('email') as FormControl; }
  get passwordCtrl() { return this.form.get('password') as FormControl; }
  locked = false;
  @Output() logged = new EventEmitter();
  constructor(
    private authService: AuthService,
    public notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.form.markAllAsTouched();
    if(this.form.invalid) {
      this.notifierService.notify('error', 'Invalid form!');
      return;
    }
    this.locked = true;
    this.authService.login(this.emailCtrl.value, this.passwordCtrl.value).pipe(
      tap(
        () => this.locked = false,
        () => this.locked = false,
      ),
      catchError((e) => this.catchError(e)),
    ).subscribe(token => this.logged.emit(token));
  }

  private catchError(error: HttpErrorResponse) {
    this.notifierService.notify('error', error.error)

    return throwError(error.error);
  }

}
