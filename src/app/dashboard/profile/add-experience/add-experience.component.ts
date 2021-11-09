import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError } from 'rxjs/operators';
import { ExperienceModel } from 'src/app/shared/models/Experience.model';
import { ErrorHandlingService } from '../../serivces/errorHandling.service';
import { ExperienceService } from '../../serivces/experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {
  constructor(
    private errorHandlingService: ErrorHandlingService,
    private experienceService: ExperienceService,
    private notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(event: { experience: ExperienceModel, form: FormGroup }) {
    this.experienceService.save(event.experience).pipe(
      catchError((e) => this.errorHandlingService.handleValidationError(e, event.form)),
    ).subscribe(
      () => {
        this.notifierService.notify('success', 'Experience added successfully');
        this.router.navigate(['/', 'dashboard', 'profile']);
      },
      () => this.notifierService.notify('error', 'Error during adding new experienece'),
    );
  }
}
