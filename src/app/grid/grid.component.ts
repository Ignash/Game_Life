import { Component, OnInit, Input } from '@angular/core';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  size: number;
  matrixValue: Array<boolean[]> = [[]];
  height: string;
  styleMain: Object;
  styleDiv : Object;
  matrixDie: boolean;

  constructor(private moduleService: ModulesService) { 
    moduleService.rang$.subscribe((range)=>{
      this.size = range; 
      this.setHeight(this.size);
      this.setMatrix(range);
      this.setStyleDiv(range);
      this.setStyleMain(range, this.height);
      this.moduleService.setMatrix(this.matrixValue);
    });

    moduleService.newMatrix$.subscribe((matrix)=>{
      this.matrixValue = matrix;
      this.moduleService.setMatrix(matrix);
    })
  }

  ngOnInit() {
    this.setHeight(this.size);
    this.setStyleMain(this.size, this.height);
    this.setStyleDiv(this.size);
    this.moduleService.setMatrix(this.matrixValue);
  } 

  reviveCell(a, b){
    this.matrixValue[a][b] = !this.matrixValue[a][b];
    this.moduleService.setMatrix(this.matrixValue);
  };

  setMatrix(size){
    if(this.matrixValue.length === 1){
      this.matrixValue = Array(size).fill(0).map(item =>Array(size).fill(false));
    } else {
      let delta = this.matrixValue.length - size;
      let a = Math.abs(Math.floor(delta/2));
      let b = Math.abs(Math.ceil(delta/2));

      if(delta > 0){
        while (a-- > 0){
          this.matrixValue.shift();
          this.matrixValue.map((elem)=>{
            elem.shift();
            return elem
          })
        };
        while (b-- > 0){
          this.matrixValue.pop();
          this.matrixValue.map((elem)=>{
            elem.pop()
            return elem
          })
        };
      } else {
        while (a-- > 0){
          this.matrixValue.unshift(Array(size).fill(false));
          this.matrixValue.map((elem)=>{
            if (elem.length !== (size)){
              elem.unshift(false)
            }
            return elem
          })
        };
        while (b-- > 0){
          this.matrixValue.push(Array(size).fill(false));
          this.matrixValue.map((elem)=>{
            if (elem.length !== (size)){
              elem.push(false)
            }
            return elem
          })
        };
      }
    }
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
