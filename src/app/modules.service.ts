import { Injectable } from '@angular/core';
import { of, Observable, observable, Subject } from 'rxjs'
import { Cell } from './cell';
import { ElementSchemaRegistry } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  rangeSource = new Subject<any>();
  newMatrixSource = new Subject<any>();
  Source = new Subject<any>();
  rang$ = this.rangeSource.asObservable();
  newMatrix$ = this.newMatrixSource.asObservable();

  serviceMatrix: Array<Cell[]> = [[]];
  deadMatrix: boolean;

  
  constructor() {}

  setRange(value: number): void{
    this.rangeSource.next(value);
  }

  setMatrix(matrix: Array<boolean[]>): void{
    var matrixValue = [];

    var newMatrix = matrix.map((i_elem, i_index)=>{
      return i_elem.map((j_elem, j_index)=>{
        matrixValue.push(j_elem);
        let neighbors;

        neighbors = matrix
        .map((elem, y_index)=>{
          return elem.filter((item, x_index)=>{
           let result;
           if (y_index !== i_index){
             if (j_index === 0) {
               result = x_index === (j_index + 1) || x_index === (matrix.length - 1) || x_index === j_index
             } else {
               if (j_index === (matrix.length - 1)) {
                result = x_index === (j_index - 1) || x_index === 0 || x_index === j_index
               } else {
                result = x_index === (j_index - 1) || x_index === (j_index + 1) || x_index === j_index
               }
             }
           } else {
            if (j_index === 0) {
              result = x_index === (j_index + 1) || x_index === (matrix.length - 1)
            } else {
              if (j_index === (matrix.length - 1)) {
               result = x_index === (j_index - 1) || x_index === 0
              } else {
               result = x_index === (j_index - 1) || x_index === (j_index + 1)
              }
            }
           }
           return result
          })
        }).filter((elem, index)=>{
          if(i_index === 0){
            return index === (i_index + 1) || index === (matrix.length - 1) || index === i_index
          } 
          if(i_index === (matrix.length - 1)){
            return index === (i_index - 1) || index === 0 || index === i_index
          }
          return index === (i_index + 1) || index === (i_index - 1) || index === i_index
        })
        
        return new Cell(i_index, j_index, j_elem, neighbors)
      })
    });

    this.serviceMatrix = newMatrix;
    this.deadMatrix = matrixValue.every((elem)=>!elem);
    

  }

  creatNewMatrix(){
    
    let newMatrix = this.serviceMatrix.map((elem, y_index)=>{
      
      let newElem = elem.map((item, x_index)=>{
        let arr = [];
        item.neighbors.forEach((elem, index) => {
          arr = arr.concat(elem)
        });

        let alife = arr.reduce((accum, value)=>{
          return value ? (accum + 1) : accum
        }, 0);

        if (item.state){
          if( alife < 2 || alife > 3) return false
          if( alife === 2 || alife === 3) return true
        } else {
          if(alife === 3) return true
          else return false
        }
      })
      return newElem
    });

    this.newMatrixSource.next(newMatrix)
  }


}
