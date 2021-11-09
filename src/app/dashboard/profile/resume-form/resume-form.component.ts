import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { SkillModel } from 'src/app/shared/models/Skill.model';
import { ExperienceService } from '../../serivces/experience.service';
import { ResumeService } from '../../serivces/resume.service';
import { SkillService } from '../../serivces/skill.service';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {

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


  onDestroy$ = new Subject();
  skillsSearchCtrl = new FormControl('');
  filteredSkills$: Observable<SkillModel[]> = this.skillService.get(this.skillsSearchCtrl.value);
  maxDate = new Date();

  @Input() initValue: ResumeModel;
  @Output() resumeSubmitted: EventEmitter<{resume: ResumeModel, form: FormGroup}> = new EventEmitter();
  constructor(
    private experienceService: ExperienceService,
    private skillService: SkillService,
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
    this.skillsSearchCtrl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300),
    ).subscribe((val) => this.filteredSkills$ = this.skillService.get(val));

    if(this.initValue) {
      console.log('init value', this.initValue);
      // this.initValue.skills = this.initValue.skills.map(r => r.id);
      this.fb.patchValue({...this.initValue});
      console.log(this.skillsCtrl.value);
    }
  }


  onSubmit() {
    if(this.fb.invalid) {
      return;
    }
    this.resumeSubmitted.emit({resume: this.fb.value, form: this.fb});
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
