import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, switchMap } from 'rxjs/operators';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { ErrorHandlingService } from '../../serivces/errorHandling.service';
import { ResumeService } from '../../serivces/resume.service';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.scss']
})
export class MyResumeComponent implements OnInit {
  resume: ResumeModel;
  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private errorHandlingService: ErrorHandlingService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.resumeService.getSingle(id))
    ).subscribe(resume => this.resume = resume);
  }

  onSubmit(event: { resume: ResumeModel, form: FormGroup }) {
    console.log(event.resume);

    this.resumeService.update(event.resume).pipe(
      catchError((e) => this.errorHandlingService.handleValidationError(e, event.form)),
    ).subscribe(
      () => {
        this.notifierService.notify('success', 'Resume added successfully');
      },
      () => this.notifierService.notify('error', 'Error during adding new Resume'),
    );
  }
}
