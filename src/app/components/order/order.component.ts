import { Component, OnInit } from '@angular/core';
import { ODataService, ODataServiceFactory } from 'angular-odata-es5';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  odata:ODataService<any>;
  workCenter: any;
  constructor(private oDataService: ODataServiceFactory) {
    this.odata = oDataService.CreateService<any>("WorkCenters");
  }

  ngOnInit(): void {
    this.odata.Query().Filter("Code eq '30041 Sorter Out'").Select("Code, CostCenter").Exec().subscribe((data)=>{
      console.log(data);
      this.workCenter = data[0];
    })
  }

}
