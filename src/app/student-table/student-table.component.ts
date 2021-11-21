import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html'
})
export class StudentTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  columns: string[] = ['students', 'schoolOrigin', 'schoolCorrecting', 'crossCorrector'];
  studentsData = new MatTableDataSource<any>();
  schoolCorrecting = new Array<any>();
  crossCorectors = {};
  studentMaster = new Array<any>();
  schoolCorrectingForm = new FormArray([]);
  crossCorrectingForm = new FormArray([]);

  constructor(private appSvc: AppService) {}

  ngOnInit(): void {
    this.getStudentTableList();
    this.getSchoolCorrectingList();
  }

  private getStudentTableList() {
    this.appSvc.getStudentData().subscribe((res: any) => {
      this.studentMaster = res;
      res.forEach(() => {
        this.schoolCorrectingForm.push(new FormControl(null));
        this.crossCorrectingForm.push(new FormControl(null));
      });
      this.studentsData.data = res;
      this.studentsData.paginator = this.paginator;
    })
  }

  private getSchoolCorrectingList() {
    this.appSvc.getSchoolList().subscribe((res: any) => {
      this.schoolCorrecting = res;
    })
  }

  onSchoolCorrectingChange(index: number) {
    this.crossCorrectingForm.controls[index].setValue(null);
    const id = this.schoolCorrectingForm.value[index];
    if (!id) {
      delete this.crossCorectors[index];
      this.updateSummary();
      return;
    }
    this.appSvc.getCrossCorectors(id).subscribe(res => {
      this.crossCorectors[index] = res;
    });

  }

  onCrossCorrectorChange() {
    this.updateSummary();
  }

  private updateSummary() {
    const schoolCorrectionCount = this.schoolCorrectingForm.value.reduce((freq: any, value: any) => {
      return freq[value] ? ++freq[value] : freq[value] = 1, freq
    }, {});

    this.appSvc.getSchoolTableList().subscribe((res: any) => {
     res.forEach((school: any) => {
        const correctionValue = schoolCorrectionCount[school._id];
        if (correctionValue) {
          school.correction = correctionValue;
        }
        school.diff = school.correction - school.students;
      });
      this.appSvc.setSummary(res);
    })
      
  }
}
