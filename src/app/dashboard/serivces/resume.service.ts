import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { environment } from 'src/environments/environment';

const resumes = [
  {
    id: 0,
    name: 'Arkadiusz Łatka',
    avatar: 'https://mdbootstrap.com/img/new/avatars/2.jpg',
    dateOfBirth: new Date(),
    city: 'Rzeszów',
    skills: ['c#'],
    description: 'Jestem bardzo zmotywowanym programistą',
  },
  {
    id: 1,
    name: 'Adam Maciuszek',
    avatar: 'https://mdbootstrap.com/img/new/avatars/2.jpg',
    dateOfBirth: new Date(),
    city: 'Kraków',
    skills: ['Javascript', 'Angular'],
    description: '',
  },
  {
    id: 2,
    name: 'Darek Psikuta',
    avatar: 'https://mdbootstrap.com/img/new/avatars/2.jpg',
    dateOfBirth: new Date(),
    city: 'Warszawa',
    skills: [],
    description: 'Nie chce mi sie uzupełniać opisu',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private http: HttpClient) {
  }

  get(): Observable<ResumeModel[]> {
    return this.http
      .get<ResumeModel[]>(`${environment.apiUrl}resume?PageSize=5&PageNumber=1`)
      .pipe(
        tap(console.log)
      );
  }

  getSingle(id: number): Observable<ResumeModel> {
    return this.http
      .get<ResumeModel>(`${environment.apiUrl}resume/${id}`)
      .pipe(
        tap(console.log)
      );
  }

  add(resume: ResumeModel): Observable<ResumeModel> {
    return this.http
      .post<ResumeModel>(`${environment.apiUrl}resume`, resume)
      .pipe(
        tap(console.log)
      );
  }

  update(resume: ResumeModel): Observable<ResumeModel> {
    return this.http
      .put<ResumeModel>(`${environment.apiUrl}resume/${resume.id}`, resume)
      .pipe(
        tap(console.log)
      );
  }

  delete(resume: ResumeModel): Observable<ResumeModel> {
    return this.http
      .delete<ResumeModel>(`${environment.apiUrl}resume/${resume.id}`)
      .pipe(
        tap(console.log)
      );
  }

}
