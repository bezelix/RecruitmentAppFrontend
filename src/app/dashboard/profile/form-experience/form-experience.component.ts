import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExperienceModel } from 'src/app/shared/models/Experience.model';

@Component({
  selector: 'app-form-experience',
  templateUrl: './form-experience.component.html',
  styleUrls: ['./form-experience.component.scss']
})
export class FormExperienceComponent implements OnInit {
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

  @Input() initValue: ExperienceModel;
  @Output() experienceSubmitted: EventEmitter<{experience: ExperienceModel, form: FormGroup}> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

    console.log('init value', this.initValue);
    if(this.initValue) {
      console.log('init value', this.initValue);
      this.fb.patchValue({...this.initValue});
    }
  }

  onSubmit() {
    if(this.fb.invalid) {
      return;
    }

    this.experienceSubmitted.emit({experience: this.fb.value, form: this.fb});
  }

}
