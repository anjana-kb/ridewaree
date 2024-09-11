import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyServiceService } from './company-service.service';
import { CompanyupdateComponent } from '../companyupdate/companyupdate.component';
 import { MatDialog, MatDialogState } from "@angular/material/dialog";
 import { Company } from '../company.model';


@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.css']
})
export class CompanydetailsComponent implements OnInit {
company:Company={
  shortName: '',
  addressLine1: '',
  addressLine2: '',
  zipCode: '',
  emailId: '',
  phoneNo1: '',
  phoneNo2: '',
  vatNo: '',
  crNo: '',
  logo: '',
  parentId: '',
  currencyId: 0
}
  
  constructor(private http: HttpClient,private companyservice:CompanyServiceService,private dialog:MatDialog ) { }

  ngOnInit(): void {
    this.getCompanyInfo();
  }
  getCompanyInfo(){
    let infoobj={
      "searchKeyword":"",
      "pageIndex": 0,
      "pageSize": 0,
    }
    this.companyservice
    .getCompanyInfo(infoobj)
    .subscribe((result: any) => {
    console.log("result from companyinfo",result);
    if(result){
      this.company = result.data.result[0];
      // console.log("this.company",this.company);
      
     
    }
    
    });
} 

update(){
  const dialogRef = this.dialog.open(CompanyupdateComponent, {
    data: JSON.parse(JSON.stringify(this.company)),
    backdropClass: "dark-backdrop",
    disableClose: true,
  })
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getCompanyInfo();
      }
    },
  });
}
// update() {
//   this.dialog.open(CompanyupdateComponent, {
//     width: '300px',
//     height: '200px',
//     data: { name: 'Test' }
//   });
// }
getLogoUrl(logo: string): string {
  const token=localStorage.getItem('loginToken')
  const baseUrl = 'http://trainingapi.ridewaretech.com/Company/GetCompanyLogo';
  return `${baseUrl}?photoName=${logo}&token=${token}`;
}
  }

