import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../serivces/auth.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  get emailCtrl() { return this.form.get('email') as FormControl; }
  get passwordCtrl() { return this.form.get('password') as FormControl; }
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginPopupComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: ,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.form.invalid) {
      return;
    }

    this.authService.login(this.emailCtrl.value, this.passwordCtrl.value).subscribe(token => this.dialogRef.close(token));
  }
}
