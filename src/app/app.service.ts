import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public summaryData: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private httpSvc: HttpClient) {
    this.initSummaryData();
  }

  private initSummaryData() {
    this.getSchoolTableList().subscribe((res: any) => {
      res.map((item: any) => item.diff = item.correction - item.students);
      this.summaryData.next(res);
    });
  }

  public getSummary() {
    return this.summaryData.asObservable();
  }

  public setSummary(summary: any) {
    this.summaryData.next(summary);
  }

  public getStudentData(): Observable<any> {
    const data = this.httpSvc.get("./assets/json/students-table-list.json").pipe(
      map((items: any) => {
        return items.map((el: any, i: number) => {
          return {
            'index': i,
            '_id': '',
            'student_name': el.student_id.first_name + el.student_id.last_name,
            'school_origin_id': el.school_origin_id._id,
            'school_origin_name': el.school_origin_id.short_name,
          }
        })
      })
    ) 
    return data;
  }

  public getSchoolList(): Observable<any> {
    return this.httpSvc.get("./assets/json/school-list.json").pipe(
      map((items: any) => {
        return items.map((item: any) => item.school)
      })
    );
  }

  public getCrossCorectors(schooldId: any): Observable<any> {
    return this.httpSvc.get("./assets/json/school-corrector-list.json").pipe(
      map((items: any) => {
        const data = items.find((el: any) => el.school._id === schooldId);
        return data.cross_correctors || {};
      })
    );
  }

  public getSchoolTableList(): Observable<any> {
    return this.httpSvc.get("./assets/json/school-table-list.json");
  }

}
