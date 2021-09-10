import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AuthPopupComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: ,
  ) { }

  ngOnInit(): void {
  }

  close(data: any) {
    console.log(data);

    this.dialogRef.close(data);
  }
}
