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
import { ResumeComponent } from './resume/resume.component';
import { ResumeFilterComponent } from './resume-list/resume-filter/resume-filter.component';
import { AddResumeComponent } from './profile/add-resume/add-resume.component';
import { AddExperienceComponent } from './profile/add-experience/add-experience.component';
import { MyResumeComponent } from './profile/my-resume/my-resume.component';
import { ResumeFormComponent } from './profile/resume-form/resume-form.component';
import { EditExperienceComponent } from './profile/edit-experience/edit-experience.component';
import { FormExperienceComponent } from './profile/form-experience/form-experience.component';


@NgModule({
  declarations: [
    ContainerComponent,
    MenuComponent,
    HomeComponent,
    ResumeListComponent,
    ProfileComponent,
    AuthPopupComponent,
    ResumeComponent,
    ResumeFilterComponent,
    AddResumeComponent,
    AddExperienceComponent,
    MyResumeComponent,
    ResumeFormComponent,
    EditExperienceComponent,
    FormExperienceComponent,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    AuthModule
  ]
})
export class DashboardModule { }
