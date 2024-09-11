import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpaddeditserviceService } from './empaddeditservice.service';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-empaddedit',
  templateUrl: './empaddedit.component.html',
  styleUrls: ['./empaddedit.component.css']
})
export class EmpaddeditComponent implements OnInit {
  empForm: FormGroup;
  updateForm: FormGroup;
  interval: any;

  constructor(   private _dialogRef: MatDialogRef<EmpaddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _fb: FormBuilder,private _empService:EmpaddeditserviceService,
    private _coreService: CoreService) {
      this.empForm = this._fb.group({
        firstName: '',
        lastName: '',
        middleName:'',
        birthDate: '',
        gender: 0,
        parmenantAddress: '',
        currentAddress: '',
        isCurrentSameAsParmenantAddress: '',
        personalEmailId: '',
        personalMobileNo: '',
        otherContactNo: '',
        employeeCode: '',
         joiningOn: '',
      });

       console.log("upfdate data",this.data);
      this.updateForm = this._fb.group({
        id:'',
        firstName: '',
        lastName: '',
        middleName:'',
        officeEmailId: '',
        officeContactNo: '',
        joiningOn: '',
        relievingOn: '',
        confirmationOn: '',
        resignationOn: '',
        designationId: '',
        reportingToId: '',
        departmentId: ''
      });
     }

  ngOnInit(): void {
    if(this.data){
      this.updateForm.patchValue(this.data);

    }
  }
  onFormSubmit() {
    // console.log("called");
    
    if (this.empForm.valid && this.updateForm.valid) {
      if (this.data) {
           console.log("this.updateForm.value UPDATEEEEEEEE",this.updateForm.value);
        this._empService
          .updateEmployee(this.updateForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        if(this.empForm.value.isCurrentSameAsParmenantAddress==1){
          this.empForm.value.isCurrentSameAsParmenantAddress=true;
        }else{
          this.empForm.value.isCurrentSameAsParmenantAddress=false;

        }
        if(this.empForm.value.gender){
          this.empForm.value.gender=Number(this.empForm.value.gender);
        }

        console.log("(this.empForm.value ",this.empForm.value);

        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            console.log("response",val);
            
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  close() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
