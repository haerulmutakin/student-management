import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html'
})
export class SchoolTableComponent implements OnInit {
  columns: string[] = ['schools', 'students', 'correction', 'diff'];
  schoolData: Array<any>;

  constructor(private appSvc: AppService) { }

  ngOnInit(): void {
    this.getSummary();
  }


  private getSummary() {
    this.appSvc.getSummary().subscribe(res => {
      this.schoolData = res;
    });
  }

}
