import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../serivces/resume.service';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent implements OnInit {
  resumes$ = this.resumeService.get();

  constructor(
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
  }

}
