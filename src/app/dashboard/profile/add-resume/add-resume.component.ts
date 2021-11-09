import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable, Subject } from 'rxjs';
import { catchError, debounceTime, takeUntil, tap } from 'rxjs/operators';
import { SkillModel } from 'src/app/shared/models/Skill.model';
import { ErrorHandlingService } from '../../serivces/errorHandling.service';
import { ExperienceService } from '../../serivces/experience.service';
import { ResumeService } from '../../serivces/resume.service';
import { SkillService } from '../../serivces/skill.service';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit, OnDestroy {
  seniorities = [
    {
      id: 0,
      name: 'junior'
    },
    {
      id: 1,
      name: 'mid'
    },
    {
      id: 2,
      name: 'senior'
    },
  ];
  fb = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    seniorityId: new FormControl(null, Validators.required),
    skills: new FormControl([], Validators.required),
  });

  get nameCtrl() { return this.fb.get('name') as FormControl }
  get surnameCtrl() { return this.fb.get('surname') as FormControl }
  get cityCtrl() { return this.fb.get('city') as FormControl }
  get descriptionCtrl() { return this.fb.get('description') as FormControl }
  get dateOfBirthCtrl() { return this.fb.get('dateOfBirth') as FormControl }
  get seniorityIdCtrl() { return this.fb.get('seniorityId') as FormControl }
  get skillsCtrl() { return this.fb.get('skills') as FormControl }

  skillsSearchCtrl = new FormControl('');
  filteredSkills$: Observable<SkillModel[]> = this.skillService.get(this.skillsSearchCtrl.value);
  maxDate = new Date();
  onDestroy$ = new Subject();

  constructor(
    private errorHandlingService: ErrorHandlingService,
    private experienceService: ExperienceService,
    private skillService: SkillService,
    private resumeService: ResumeService,
    private notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.skillsSearchCtrl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300),
      tap(console.log),
    ).subscribe((val) => this.filteredSkills$ = this.skillService.get(val));
  }

  onSubmit() {
    if(this.fb.invalid) {
      return;
    }

    this.resumeService.save(this.fb.value).pipe(
      catchError((e) => this.errorHandlingService.handleValidationError(e, this.fb)),
    ).subscribe(
      () => {
        this.notifierService.notify('success', 'Resume added successfully');
        this.router.navigate(['/', 'dashboard', 'profile']);
      },
      () => this.notifierService.notify('error', 'Error during adding new Resume'),
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
