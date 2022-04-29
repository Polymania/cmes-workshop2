import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ODataService, ODataServiceFactory } from 'angular-odata-es5';
import { Subscription, takeWhile } from 'rxjs';
import { LogonService } from 'src/app/services/logon.service';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  odata:ODataService<any>;
  odataFeedback:ODataService<any>;
  productionOrder: any;
  itemCode: string;
  isSmallScreen:boolean = false;
  isAlive:boolean = true;

  constructor(private oDataService: ODataServiceFactory,
              private logonService: LogonService,
              private signalR: SignalRService,
              private ref: ChangeDetectorRef,
              breakpointObserver: BreakpointObserver) {
    this.odata = oDataService.CreateService<any>("ProductionOrders");
    this.odataFeedback = oDataService.CreateService<any>("Feedbacks");
    this.itemCode = '586549';
    breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(takeWhile(()=>this.isAlive))
    .subscribe(result => {
      this.isSmallScreen = false;
      if(result.breakpoints[Breakpoints.Small]||result.breakpoints[Breakpoints.XSmall] ){
        this.isSmallScreen = true;
      }
      console.log("Screensize small?" + this.isSmallScreen);

    })
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  ngOnInit(): void {
    this.logonService.logon("Administrator", "Homag");
    const hub = this.signalR.createHub("NotificationHub");
    if(hub != null){
      hub.state$.subscribe((state)=>{
        console.log(state);
      });

      hub.on('onEntityChangedMessage').subscribe((data:any)=>{
        if(data.includes(this.productionOrder?.Code)){
          console.log("reload");
          this.loadData();

        }
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
        this.ref.detectChanges();
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
