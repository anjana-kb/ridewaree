

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployedetailsService } from './employedetails.service';
import { EmpaddeditComponent } from '../empaddedit/empaddedit.component';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  displayedColumns: string[] = [
   "id",
                "firstName",
                "lastName",
                "middleName",
                // "fullName",
                // "employeeCode",
                "officeEmailId",
                "officeContactNo",
                "joiningOn",
                "confirmationOn",
                "resignationOn",
                "relievingOn",
                "designationId",
                // "designationName",
                "reportingToId",
                // "reportingToName",
                "departmentId",
                'action'
                // "departmentName",
                // "isUserCreated",
                // "profilePhotoName",
                // "userId"
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(    private _dialog: MatDialog,private empservice:EmployedetailsService,private CoreService:CoreService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();

  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpaddeditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  getEmployeeList() {
    let obj={
      "searchKeyword":"",
      "pageIndex": 0,
      "pageSize": 0,
    }
    this.empservice.getEmployeeList(obj).subscribe((resp:any)=>{
      // console.log(resp.data.result,"resp")
      this.dataSource = new MatTableDataSource(resp.data.result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this.empservice.deleteEmployee(id).subscribe({
      next: (res) => {
        this.CoreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpaddeditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
          console.log("emplist calleddddddddddddddddd");
          
        }
      },
    });
  }
 }
