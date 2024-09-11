import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../pages/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginservice:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   const token=localStorage.getItem('loginToken')
  //   const newCloneREquest = request.clone({
  //     setHeaders:{
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   return next.handle(newCloneREquest);
  // }
  const token=localStorage.getItem('loginToken')
  let modifiedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  if (request.body) {
    const id = localStorage.getItem('companyId'); 

    if (request.body instanceof Object) {
      const modifiedBody = { ...request.body, id };
      
      modifiedRequest = request.clone({
        body: modifiedBody,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next.handle(modifiedRequest)
//   .pipe(
//     catchError((error:HttpErrorResponse)=>{
//       if(error.status===401){
//         const isRefresh=confirm("do you want to continue?")
//         if(isRefresh){
// this.loginservice.refreshToken.next(true)
//         }
//       }
// return throwError(error)

//     })
//   )
}
}
