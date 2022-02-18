import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-production-step',
  templateUrl: './production-step.component.html',
  styleUrls: ['./production-step.component.scss']
})
export class ProductionStepComponent implements OnInit {
  @Input() step:any;
  @Output() feedback = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  btnClick(){
    console.log("im ClickEvent");
    this.feedback.emit(this.step);

  }

}
