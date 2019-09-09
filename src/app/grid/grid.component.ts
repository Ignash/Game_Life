import { Component, OnInit, Input } from '@angular/core';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  size: number;
  matrixValue: object[];
  height: string;
  styleMain: Object;
  styleDiv : Object;

  

  constructor(private moduleService: ModulesService) { 
    moduleService.rang$.subscribe(range=>{
      this.size = range; 
      this.setHeight(this.size);
      this.setMatrix(range);
      this.setStyleDiv(range);
      this.setStyleMain(range, this.height);
    })
  }

  ngOnInit() {
    this.setMatrix(this.size);
    this.setHeight(this.size);
    this.setStyleMain(this.size, this.height);
    this.setStyleDiv(this.size);
  } 

  reviveCell(a, b){
    this.matrixValue[a][b] = !this.matrixValue[a][b];
    this.moduleService.serviceMatrix = this.matrixValue;
  }

  setMatrix(size){
    this.matrixValue = Array(size).fill(0).map(item =>Array(size).fill(false));
  };

  setStyleMain(size, height){
    this.styleMain = {
      'grid-template-rows': `repeat(${size}, 10px)`,
      'width': height,
      'height': height
    }
  }

  setStyleDiv(size){
    this.styleDiv = {
      'grid-template-columns': `repeat(${size}, 10px)`,
    };
  }

  setHeight(size){
    this.height = (size*10 + (size - 1)*2) + 'px';
  }
  
}
