import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthPopupComponent } from 'src/app/dashboard/modals/auth-popup/auth-popup.component';
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
  });
  get emailCtrl() { return this.form.get('email') as FormControl; }
  get passwordCtrl() { return this.form.get('password') as FormControl; }
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AuthPopupComponent>,
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
