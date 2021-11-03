import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resume-filter',
  templateUrl: './resume-filter.component.html',
  styleUrls: ['./resume-filter.component.scss']
})
export class ResumeFilterComponent implements OnInit {
  locations = [
    {
      id: 0,
      name: 'Kraków'
    },
    {
      id: 1,
      name: 'Warszwa'
    },
    {
      id: 2,
      name: 'Rzeszów'
    }
  ];
  skills = [
    {
      id: 0,
      name: 'c#'
    },
    {
      id: 1,
      name: 'Javascript'
    }
  ];
  form = new FormGroup({
    'name': new FormControl(),
    'skills': new FormControl([]),
    'location': new FormControl([]),
  });
  get nameCtrl() {
    return this.form.get('name');
  }
  get skillsCtrl() {
    return this.form.get('skills');
  }
  get locationCtrl() {
    return this.form.get('location');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
