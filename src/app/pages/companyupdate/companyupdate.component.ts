import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { CompanyServiceService } from '../companydetails/company-service.service';
import { CompanyupdateService } from './companyupdate.service';


@Component({
  selector: 'app-companyupdate',
  templateUrl: './companyupdate.component.html',
  styleUrls: ['./companyupdate.component.css']
})
export class CompanyupdateComponent implements OnInit {
  updateForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<CompanyupdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _fb: FormBuilder,private _coreService: CoreService,
  private companyupdateservice:CompanyupdateService) { 
      this.updateForm = this._fb.group({
        id:'',
        name: '',
        shortName: '',
        contactPersonName:'',
        addressLine1: '',
        addressLine2: '',
        zipCode: '',
        emailId: '',
        phoneNo1: '',
        phoneNo2: '',
        vatNo: '',
        crNo: '',
        currencyId: '',
      });
    }

  ngOnInit(): void {
    this.dialogRef.updateSize("30%", "90%");
    console.log("this.data",this.data);
    
    this.updateForm.patchValue(this.data);
  }
 
  onClose(): void {
    this.dialogRef.close();
  }
  onFormSubmit() {
    console.log("called");
    
    if (this.updateForm.valid) {
      if (this.data) {
          console.log("this.updateForm.value",this.updateForm.value);
        this.companyupdateservice
          .updateCompany(this.updateForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Company details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      // } else {
      //   if(this.empForm.value.isCurrentSameAsParmenantAddress==1){
      //     this.empForm.value.isCurrentSameAsParmenantAddress=true;
      //   }else{
      //     this.empForm.value.isCurrentSameAsParmenantAddress=false;

      //   }
      //   if(this.empForm.value.gender){
      //     this.empForm.value.gender=Number(this.empForm.value.gender);
      //   }

      //   console.log("(this.empForm.value",this.empForm.value);

      //   this._empService.addEmployee(this.empForm.value).subscribe({
      //     next: (val: any) => {
      //       console.log("response",val);
            
      //       this._coreService.openSnackBar('Employee added successfully');
      //       this._dialogRef.close(true);
      //     },
      //     error: (err: any) => {
      //       console.error(err);
      //     },
      //   });
      // }
    }
  }

  }}
