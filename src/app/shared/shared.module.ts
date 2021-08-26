import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedDirective } from './directives/isLogged.directive';
import { MaterialModule } from './material-module/material.module';



@NgModule({
  declarations: [
    IsLoggedDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    IsLoggedDirective,
    MaterialModule,
  ]
})
export class SharedModule { }
