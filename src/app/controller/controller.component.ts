import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { ModulesService } from '../modules.service'
import { delay } from 'q';

@Component({
  selector: 'controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {
  start: boolean;
  delay: number;

  @ViewChild('rangeInput', { read: ElementRef , static: true})
  rangeInput: ElementRef;

  constructor(private moduleService: ModulesService) { }

  ngOnInit() {
    this.start = false
    this.delay = 500;
    this.changeRange(+this.rangeInput.nativeElement.value);
  }

  changeRange(value) {
    this.moduleService.setRange(value);
  }

  changeDelay(value) {
    this.delay = +value;
    
  }

  startLife(){
    if (!this.moduleService.deadMatrix){
      this.rangeInput.nativeElement.disabled = true;
      console.log(this.rangeInput)
      this.start = true;
      let live = setTimeout(tick.bind(this), this.delay);
      function tick(){
        if (this.start && !this.moduleService.deadMatrix){
          this.moduleService.creatNewMatrix()
          live = setTimeout(tick.bind(this), this.delay)
        } else{
          clearTimeout(live);
          this.start = false;
          this.rangeInput.nativeElement.disabled = false;
        }
      }
    }
  };

  

  endLife(){
    this.start = false;
  }

}
