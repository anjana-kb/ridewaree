import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  loginObj:any ={
    "username":"",
    "clientid":"",
    "password":""
  }
  onLogin(){
    console.log("this.loginObj",this.loginObj);
    
    this.http.post('http://trainingapi.ridewaretech.com/User/Login',this.loginObj).subscribe((res:any)=>{
      if(res.data){
        alert('login success')
        localStorage.setItem('loginToken',res.data.token)
        localStorage.setItem('companyId',res.data.companyId)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        localStorage.setItem('refreshid',res.data.id)

        this.router.navigateByUrl('/home')
      }else{
        alert(res.errorMessages)
      }
    
    })
  }
 
}
