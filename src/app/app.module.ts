import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';

import { CorrectingOptPipe } from './pipes/correcting-opt.pipe';
import { UnassignedTotalPipe } from './pipes/unassigned-total.pipe';
import { AppComponent } from './app.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { SchoolTableComponent } from './school-table/school-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CorrectingOptPipe,
    UnassignedTotalPipe,
    StudentTableComponent,
    SchoolTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
