import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  @Output() logged = new EventEmitter();
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.form.invalid) {
      console.log(this.passwordCtrl.errors);

      return;
    }

    this.authService.login(this.emailCtrl.value, this.passwordCtrl.value).subscribe(token => this.logged.emit(token));
  }

}
