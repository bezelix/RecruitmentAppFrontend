import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContainerComponent } from './container/container.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthPopupComponent } from './modals/auth-popup/auth-popup.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    ContainerComponent,
    MenuComponent,
    HomeComponent,
    ResumeListComponent,
    ProfileComponent,
    AuthPopupComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    AuthModule
  ]
})
export class DashboardModule { }
