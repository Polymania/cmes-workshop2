import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-production-step',
  templateUrl: './production-step.component.html',
  styleUrls: ['./production-step.component.scss']
})
export class ProductionStepComponent implements OnInit {
  @Input() step:any;

  constructor() { }

  ngOnInit(): void {
  }

}
