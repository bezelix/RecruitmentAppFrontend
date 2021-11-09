import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseWithPaginationModel } from 'src/app/shared/models/Response.model';
import { ResumeModel } from 'src/app/shared/models/Resume.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private http: HttpClient) {
  }

  get(): Observable<ResponseWithPaginationModel<ResumeModel>> {
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

  save(resume: ResumeModel): Observable<ResumeModel> {
    console.log(resume);
    const data = {...resume, skillsId: resume.skills.map(r => r.id)};

    delete data.skills;

    return this.http
      .post<ResumeModel>(`${environment.apiUrl}resume`, data)
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
