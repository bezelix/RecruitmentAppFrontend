import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContainerComponent } from './container/container.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginPopupComponent } from './modals/login-popup/login-popup.component';


@NgModule({
  declarations: [
    ContainerComponent,
    MenuComponent,
    HomeComponent,
    ResumeListComponent,
    ProfileComponent,
    LoginPopupComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
