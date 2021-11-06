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
  fb = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
  });

  get nameCtrl() { return this.fb.get('name') as FormControl }
  get descriptionCtrl() { return this.fb.get('description') as FormControl }
  get startDateCtrl() { return this.fb.get('startDate') as FormControl }
  get endDateCtrl() { return this.fb.get('endDate') as FormControl }
  constructor(
    private errorHandlingService: ErrorHandlingService,
    private experienceService: ExperienceService,
    private notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.fb.invalid) {
      return;
    }

    this.experienceService.save(this.fb.value).pipe(
      catchError((e) => this.errorHandlingService.handleValidationError(e, this.fb)),
    ).subscribe(
      () => {
        this.notifierService.notify('success', 'Experience added successfully');
        this.router.navigate(['/', 'dashboard', 'profile']);
      },
      () => this.notifierService.notify('error', 'Error during adding new experienece'),
    );
  }
}
