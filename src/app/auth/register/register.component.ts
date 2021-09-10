import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/dashboard/serivces/auth.service';

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
  });
  get emailCtrl() { return this.form.get('email') as FormControl; }
  get passwordCtrl() { return this.form.get('password') as FormControl; }
  get confirmPasswordCtrl() { return this.form.get('confirmPassword') as FormControl; }
  @Output() registered = new EventEmitter();
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.form.invalid) {
      return;
    }

    this.authService.login(this.emailCtrl.value, this.passwordCtrl.value).subscribe(token => this.registered.emit(token));
  }

}
