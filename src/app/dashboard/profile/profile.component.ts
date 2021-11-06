import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, share, tap } from 'rxjs/operators';
import { ExperienceModel } from 'src/app/shared/models/Experience.model';
import { ResponseWithPaginationModel } from 'src/app/shared/models/Response.model';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { ExperienceService } from '../serivces/experience.service';
import { ResumeService } from '../serivces/resume.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  resumes$: Observable<ResponseWithPaginationModel<ResumeModel>> = this.resumesService.get().pipe(
    tap(() => this.resumesIsLoading$.next(false)),
    share(),
  );
  resumesIsLoading$ = new BehaviorSubject<boolean>(true);

  experiences$: Observable<ExperienceModel[]> = this.experienceService.get().pipe(
    tap(() => this.experiencesIsLoading$.next(false)),
    share(),
  );
  experiencesIsLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private resumesService: ResumeService,
    private experienceService: ExperienceService,
  ) { }

  ngOnInit(): void {
    this.experiences$.subscribe();
  }
}
