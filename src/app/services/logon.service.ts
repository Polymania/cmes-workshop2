import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogonService {

  constructor(private http: HttpClient) { }

  logon(user: string, password: string){
    var data = "UserName="+user+"&Password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    this.http.post("http://srv010wpapp1/Demo13/application/token", data, {headers: reqHeader}).subscribe((data)=>{
      console.log(data);
    });
  }
}
