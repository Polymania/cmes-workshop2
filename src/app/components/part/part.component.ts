import { NgtVector3 } from '@angular-three/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  @Input() length: number = 100.0;
  @Input() width: number = 100.0;
  @Input() thickness: number = 100.0;
  @Input() position?: NgtVector3;

  constructor() { }

  ngOnInit(): void {
  }

}
