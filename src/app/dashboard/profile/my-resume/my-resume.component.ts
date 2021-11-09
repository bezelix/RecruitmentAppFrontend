import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { ResumeService } from '../../serivces/resume.service';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.scss']
})
export class MyResumeComponent implements OnInit {
  resume: ResumeModel;
  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.resumeService.getSingle(id))
    ).subscribe(resume => this.resume = resume);
  }

}
