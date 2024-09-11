import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployedetailsService {

  constructor(private http: HttpClient) { }

  getEmployeeList(obj:any) {    
    return this.http.post("http://trainingapi.ridewaretech.com/Employee/GetAllEmployees",obj)
  }
  deleteEmployee(id:any){
     return this.http.post("",id)

  }
}
