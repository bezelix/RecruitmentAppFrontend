import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SkillModel } from 'src/app/shared/models/Skill.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private http: HttpClient) {
  }

  get(name?: string): Observable<SkillModel[]> {
    return this.http
      .post<SkillModel[]>(`${environment.apiUrl}skills`, {name})
      .pipe(
        tap(console.log)
      );
  }
}
