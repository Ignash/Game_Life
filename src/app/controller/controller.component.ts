import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { ModulesService } from '../modules.service'

@Component({
  selector: 'controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {

  @ViewChild('rangeInput', { read: ElementRef , static: true})
  rangeInput: ElementRef;

  constructor(private ModuleService: ModulesService) { }

  ngOnInit() {
    this.changeRange(+this.rangeInput.nativeElement.value);
  }

  changeRange(value) {
    this.ModuleService.setRange(value);
  }

}
