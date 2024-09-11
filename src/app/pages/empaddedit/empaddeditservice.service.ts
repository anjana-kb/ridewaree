import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpaddeditserviceService {

  constructor(private http: HttpClient) { }
  
  addEmployee(obj:any) {    
    return this.http.post("http://trainingapi.ridewaretech.com/Employee/CreateEmployee",obj)
  }
  updateEmployee(obj:any){
    console.log("obj",obj);
    
    return this.http.post("http://trainingapi.ridewaretech.com/Employee/UpdateEmployee",obj)

  }
}
