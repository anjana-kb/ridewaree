import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private http: HttpClient) { }

  getCompanyInfo(infoobj:any) {
    console.log("infoobj",infoobj);
    
    return this.http.post("http://trainingapi.ridewaretech.com/Company/GetCompanyInfo",infoobj)
  }
  }
