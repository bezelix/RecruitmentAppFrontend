import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/dashboard/serivces/auth.service';
import { ErrorHandlingService } from 'src/app/dashboard/serivces/errorHandling.service';
import { ErrorModel } from 'src/app/shared/models/error.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl(null, [Validators.required]),
  });
  roles$ = this.authService.getRoles().pipe(
    tap(roles => this.roleCtrl.setValue(roles[0].id)),
  );
  get emailCtrl() { return this.form.get('email') as FormControl; }
  get passwordCtrl() { return this.form.get('password') as FormControl; }
  get confirmPasswordCtrl() { return this.form.get('confirmPassword') as FormControl; }
  get roleCtrl() { return this.form.get('role') as FormControl; }
  locked = false;
  @Output() registered = new EventEmitter();
  constructor(
    private authService: AuthService,
    public notifierService: NotifierService,
    private errorHandlingService: ErrorHandlingService,
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.form.markAllAsTouched();
    if(this.form.invalid) {
      console.log(this.form);

      this.notifierService.notify('error', 'Invalid form!');
      return;
    }

    this.locked = true;
    this.authService.register(this.emailCtrl.value, this.passwordCtrl.value).pipe(
      tap(
        () => this.locked = false,
        () => this.locked = false,
      ),
      catchError((e) => this.errorHandlingService.handleValidationError(e, this.form)),
    ).subscribe(token => this.registered.emit(token));
  }
}
