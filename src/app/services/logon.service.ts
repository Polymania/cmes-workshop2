import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogonService {
  private dataSource = new BehaviorSubject<string>('');
  public token = this.dataSource.asObservable();

  changeToken(token: string){
    this.dataSource.next(token);
  }

  constructor(private http: HttpClient) { }

  logon(user: string, password: string){
    var data = "UserName="+user+"&Password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded', 'No-Auth':'True'});
    console.time("laufzeit");
    this.http.post("http://srv010wpapp1/Demo13/application/token", data, {headers: reqHeader}).subscribe((data:any)=>{
      console.debug(data);
      console.timeEnd("laufzeit");
      this.changeToken(data.access_token);
    });
  }
}
