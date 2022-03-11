import { Component, OnInit } from '@angular/core';
import { ODataService, ODataServiceFactory } from 'angular-odata-es5';
import { LogonService } from 'src/app/services/logon.service';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  odata:ODataService<any>;
  odataFeedback:ODataService<any>;
  productionOrder: any;
  itemCode: string;

  constructor(private oDataService: ODataServiceFactory,
              private logonService: LogonService,
              private signalR: SignalRService) {
    this.odata = oDataService.CreateService<any>("ProductionOrders");
    this.odataFeedback = oDataService.CreateService<any>("Feedbacks");
    this.itemCode = '518178';
  }

  ngOnInit(): void {
    this.logonService.logon("Administrator", "Homag");
    const hub = this.signalR.createHub("Andreas");
    if(hub != null){
      hub.state$.subscribe((state)=>{
        console.log(state);
      });

      hub.on('onEntityChangedMessage').subscribe((data:any)=>{
        console.log(data);
      });

      hub.start();
    }
  }

  loadData(){
    console.log(`ItemCode ${this.itemCode}`);
    this.odata.Query().Filter(`ProductionItems/any(d:d/Code eq '${this.itemCode}')`).Expand("ProductionSteps").Exec().subscribe(
      data => {
      console.log(data);
      this.productionOrder = data[0];
    });
  }

  onFeedback(step: any){
    console.log("Feedback ind OrderComponent");
    console.log(step);

    const data = {
      ProductionItemCode: this.itemCode,
      ProductionStepCode: step.Code,
      WorkcenterCode: step.WorkCenterCode,
      CountGood: 1,
      FeedbackState: 'Finished',
      ProcessingState: 10,
      Timestamp: new Date(),
      CreationSource: 'Andreas'
      };

    console.log(data);
    this.odataFeedback.Post(data).Exec().subscribe((erg)=>{
      console.log(erg);
      // setTimeout(()=>{
      //   this.loadData();
      // }, 3000);
    })
  }
}
