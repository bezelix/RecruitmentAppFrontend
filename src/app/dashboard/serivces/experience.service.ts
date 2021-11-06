import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ExperienceModel } from 'src/app/shared/models/Experience.model';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpClient) {
  }

  getSingle(id: number): Observable<ExperienceModel> {
    return this.http
      .get<ExperienceModel>(`${environment.apiUrl}experience/${id}`)
      .pipe(
        tap(console.log)
      );
  }

  get(): Observable<ExperienceModel[]> {
    return this.http
      .get<ExperienceModel[]>(`${environment.apiUrl}experience?PageSize=5&PageNumber=1`)
      .pipe(
        tap(console.log)
      );
  }

  save(experience: ExperienceModel): Observable<ExperienceModel> {
    return this.http
      .post<ExperienceModel>(`${environment.apiUrl}experience`, {...experience})
      .pipe(
        tap(console.log)
      );
  }

  update(experience: ExperienceModel): Observable<ExperienceModel> {
    return this.http
      .put<ExperienceModel>(`${environment.apiUrl}experience`, {...experience})
      .pipe(
        tap(console.log)
      );
  }

  remove(experience: ExperienceModel): Observable<void> {
    return this.http
      .delete<void>(`${environment.apiUrl}experience/${experience.id}`)
      .pipe(
        tap(console.log)
      );
  }

  attach(experience: ExperienceModel, resume: ResumeModel): Observable<void> {
    return this.http
      .get<void>(`${environment.apiUrl}experience`)
      .pipe(
        tap(console.log)
      );
  }

  detach(experience: ExperienceModel, resume: ResumeModel): Observable<void> {
    return this.http
      .get<void>(`${environment.apiUrl}experience`)
      .pipe(
        tap(console.log)
      );
  }

}
