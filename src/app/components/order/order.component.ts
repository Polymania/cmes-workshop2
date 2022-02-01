import { Component, OnInit } from '@angular/core';
import { ODataService, ODataServiceFactory } from 'angular-odata-es5';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  odata:ODataService<any>;
  productionOrder: any;
  itemCode: string;

  constructor(private oDataService: ODataServiceFactory) {
    this.odata = oDataService.CreateService<any>("ProductionOrders");
    this.itemCode = '422992';
  }

  ngOnInit(): void {

  }

  loadData(){
    console.log(`ItemCode ${this.itemCode}`);
    this.odata.Query().Filter(`ProductionItems/any(d:d/Code eq '${this.itemCode}')`).Expand("ProductionSteps").Exec().subscribe(
      data => {
      console.log(data);
      this.productionOrder = data[0];
    });
  }

}
