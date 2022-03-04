import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogonService } from './logon.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token='';

  constructor(private logonService: LogonService) {
    logonService.token.subscribe((token)=>{
       this.token = token;
       console.log(token);
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.headers.get("No-Auth") == "True"){
      return next.handle(request);
    }

    let cloneRequest = request.clone({
      headers: request.headers.set("Authorization", `Bearer ${this.token}`)
    });

    return next.handle(cloneRequest);
  }
}
