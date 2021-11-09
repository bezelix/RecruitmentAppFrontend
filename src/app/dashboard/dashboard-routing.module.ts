import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { AddExperienceComponent } from './profile/add-experience/add-experience.component';
import { AddResumeComponent } from './profile/add-resume/add-resume.component';
import { EditExperienceComponent } from './profile/edit-experience/edit-experience.component';
import { MyResumeComponent } from './profile/my-resume/my-resume.component';
import { ProfileComponent } from './profile/profile.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'resumes',
      },
      {
        path: 'resumes',
        component: ResumeListComponent,
      },
      {
        path: 'resumes/:id',
        component: ResumeComponent,
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ProfileComponent
          },
          {
            path: 'experience',
            component: AddExperienceComponent
          },
          {
            path: 'experience/:id',
            component: EditExperienceComponent,
          },
          {
            path: 'resume',
            component: AddResumeComponent
          },
          {
            path: 'myResume/:id',
            component: MyResumeComponent
          }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
