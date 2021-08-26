import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { get, includes, isArray } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DELAY_MS = 1000;
const NO_DIALOG_SPINNER_CLASS = 'no-dialog-spinner';

export const MAT_DIALOG_DEFAULT_OPTIONS_VALUES: MatDialogConfig = {
  backdropClass: 'mat-dialog-backdrop',
  hasBackdrop: true,
  panelClass: 'dialog-spinner',
  width: '90vw',
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() dialogRef: MatDialogRef<any>;

  private onDestroy$ = new Subject();

  ngOnInit() {
    if (this.dialogRef) {
      const panelClass = get(this.dialogRef, '_containerInstance._config.panelClass', []);
      const panelClassArr = isArray(panelClass) ? panelClass : [panelClass];

      if (!includes(panelClassArr, NO_DIALOG_SPINNER_CLASS)) {
        this.dialogRef.addPanelClass(MAT_DIALOG_DEFAULT_OPTIONS_VALUES.panelClass);
        this.dialogRef
          .afterOpened()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(() => setTimeout(() => this.afterOpened(), DELAY_MS));
      }
    }
  }

  private afterOpened() {
    this.dialogRef.removePanelClass(MAT_DIALOG_DEFAULT_OPTIONS_VALUES.panelClass);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
