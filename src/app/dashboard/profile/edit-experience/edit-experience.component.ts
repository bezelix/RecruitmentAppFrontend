import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ExperienceModel } from 'src/app/shared/models/Experience.model';
import { ErrorHandlingService } from '../../serivces/errorHandling.service';
import { ExperienceService } from '../../serivces/experience.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {
  experience: ExperienceModel;
  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private errorHandlingService: ErrorHandlingService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.experienceService.getSingle(id)),
      tap(console.log),
    ).subscribe(experience => this.experience = experience);
  }

  onSubmit(event: { experience: ExperienceModel, form: FormGroup }) {
    this.experienceService.update({...event.experience, id: this.experience.id}).pipe(
      catchError((e) => this.errorHandlingService.handleValidationError(e, event.form)),
    ).subscribe(
      () => {
        this.notifierService.notify('success', 'Experience editted successfully');
      },
      () => this.notifierService.notify('error', 'Error during editing'),
    );
  }

}
