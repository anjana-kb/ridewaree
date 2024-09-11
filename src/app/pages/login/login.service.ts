import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public refreshToken = new Subject<boolean>();
  constructor(private http:HttpClient) {
    this.refreshToken.subscribe((resp)=>{
      this.getRefreshToken();
    })
   }

  getRefreshToken(){
    const refreshToken=localStorage.getItem('refreshToken')
    // const id=localStorage.getItem('companyId')
    const refreshid=localStorage.getItem('refreshid');

    const obj={
      "id":refreshid,
      "refreshToken": refreshToken,
      "clientId": "ERPWebApp"
    }
    return this.http.post("http://trainingapi.ridewaretech.com/User/RevokeRefreshToken",obj).subscribe((res:any)=>{
      localStorage.setItem('loginToken',res.data.token)
      localStorage.setItem('companyId',res.data.companyId)
      localStorage.setItem('refreshToken',res.data.refreshToken)
      localStorage.setItem('refreshid',res.data.id)

    })
  }
}
