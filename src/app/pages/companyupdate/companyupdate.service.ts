import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyupdateService {
  constructor(private http: HttpClient) { }

  updateCompany(infoobj:any) {
    console.log("infoobj",infoobj);
    
    return this.http.post("http://trainingapi.ridewaretech.com/Company/UpdateCompany",infoobj)
  }
}
