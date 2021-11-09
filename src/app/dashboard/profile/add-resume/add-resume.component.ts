import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError } from 'rxjs/operators';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { ErrorHandlingService } from '../../serivces/errorHandling.service';
import { ResumeService } from '../../serivces/resume.service';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {

  constructor(
    private errorHandlingService: ErrorHandlingService,
    private resumeService: ResumeService,
    private notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(event: { resume: ResumeModel, form: FormGroup }) {
    this.resumeService.save(event.resume).pipe(
      catchError((e) => this.errorHandlingService.handleValidationError(e, event.form)),
    ).subscribe(
      () => {
        this.notifierService.notify('success', 'Resume added successfully');
        this.router.navigate(['/', 'dashboard', 'profile']);
      },
      () => this.notifierService.notify('error', 'Error during adding new Resume'),
    );
  }
}
