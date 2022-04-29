import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'cmes-workshop';

  constructor(public platform: Platform){
    console.log(platform);

  }
  test(){
    this.title = "neuerName";
  }
}
