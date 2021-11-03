import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../serivces/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  resume$ = this.resumeService.getSingle(1);
  constructor(
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
    console.log('dupa');

  }

}
